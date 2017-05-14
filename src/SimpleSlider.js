import Slider from "./Slider.js";

export class SimpleSlider {

    constructor() {
        this.sliders = [];
        this.initQueue = [];
        this.initQueuePointer = 0;
        this.pageLoaded = false;

        if(document.readyState === "complete" || document.readyState === "loaded") {
            this.contentReady();
        } else {
            document.addEventListener("DOMContentLoaded", function() {
                this.contentReady();
            }.bind(this), false);
        }
    }

    init(data) {
        return new Promise(function(resolve, reject) {
            data.__readyCallback = function(slider) {
                resolve(slider);
            };

            if(this.pageLoaded) {
                this.initSlider(data);
            } else {
                this.initQueue.push(data);
            }
        }.bind(this));
    }

    contentReady() {
        this.initSliderFromQueue();
    }

    initSliderFromQueue() {
        if(this.initQueuePointer > this.initQueue.length - 1) {
            return;
        }

        var sliderData = this.initQueue[this.initQueuePointer];

        // Doing this instead of looking through the slider array directly
        // allows for one frame per slider.
        this.initSlider(sliderData).then(function() {
            this.initSliderFromQueue();
        }.bind(this), function() {
            console.warn("Error initializing " + sliderData.name + " slider.");
        });
    }

    initSlider(data) {
        return new Promise(function(resolve, reject) {
            requestAnimationFrame(function() {
                var _slider = new Slider(data);
                this.sliders.push(_slider);

                data.__readyCallback(_slider);
            }.bind(this));
        }.bind(this));
    }

}
