(function() {
    var SimpleSlider = function () {
        var self = this;
        this.sliders = [];
        this.initQueue = [];
        this.initQueuePointer = 0;
        this.pageLoaded = false;

        if(document.readyState === "complete" || document.readyState === "loaded") {
            self.contentReady();
        } else {
            document.addEventListener("DOMContentLoaded", function() {
                self.contentReady();
            }, false);
        }
    };

    SimpleSlider.prototype.init = function(data) {
        if(this.pageLoaded) {
            this.initSlider(data);
        } else {
            this.initQueue.push(data);
        }
    };

    SimpleSlider.prototype.contentReady = function() {
        this.initSliderFromQueue();
    };

    SimpleSlider.prototype.initSliderFromQueue = function() {
        if(this.initQueuePointer > this.initQueue.length - 1) {
            return;
        }

        var self = this,
            sliderData = this.initQueue[this.initQueuePointer];

        // Doing this instead of looking through the slider array directly
        // allows for one frame per slider. 
        this.initSlider(sliderData).then(function() {
            self.initSliderFromQueue();
        }, function() {
            console.warn("Error initializing " + sliderData.name + " slider.");
        });
    };

    SimpleSlider.prototype.initSlider = function(data) {
        var self = this;

        return new Promise(function(resolve, reject) {
            requestAnimationFrame(function() {
                self.sliders.push(new Slider(data));
            });
        });
    };

    var Slider = function(data) {
        this.element = data.element || document.querySelector(data.selector);

        console.log(this.element);
    };

    if(!window.SimpleSlider) {
        window.SimpleSlider = new SimpleSlider();
    } else {
        console.warn("SimpleSlider module conflicts with another object or module on this page.");
    }
})();