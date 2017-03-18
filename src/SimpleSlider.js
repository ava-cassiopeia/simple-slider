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
        var self = this;

        return new Promise(function(resolve, reject) {
            data.__readyCallback = function(slider) {
                resolve(slider);
            };

            if(self.pageLoaded) {
                self.initSlider(data);
            } else {
                self.initQueue.push(data);
            }
        });
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
                var _slider = new Slider(data);
                self.sliders.push(_slider);

                data.__readyCallback(_slider);
            });
        });
    };

    var Slider = function(data) {
        this.element = data.element || document.querySelector(data.selector);
        this.delay = data.delay || 5000;
        this.ready = false;
        this.counting = false;
        this.sliding = false;
        this.index = 0;

        this.setup();
    };

    Slider.prototype.setup = function() {
        var x, child, self = this, children = this.element.children;

        this.element.className += " _simple_slider";

        for(x = 0; x < children.length; x++) {
            child = children[x];

            if(x == 0) {
                child.className += " _slide _active";
            } else {
                child.className += " _slide";
            }

            child.addEventListener("transitionend", function(e) {
                self.childTransitionEnded(e);
            });

            child.addEventListener("touchstart", function(e) {
                self.touchStarted(e);
            }, false);
        }

        this.ready = true;
        this.startCounting();
    };

    Slider.prototype.startCounting = function() {
        if(this.counting) {
            console.warn("Slider is already counting!");
            return;
        } else {
            var self = this;
            this.counting = true;

            setInterval(function() {
                self.tick();
            }, this.delay);
        }
    };

    Slider.prototype.tick = function() {
        this.next();
    };

    Slider.prototype.next = function() {
        const slidingClass = "_sliding";
        var self = this, children = this.element.children;

        requestAnimationFrame(function() {
            var nextIndex = self.index + 1 >= children.length ? 0 : self.index + 1;

            addClass(children[self.index], slidingClass);
            addClass(children[nextIndex], slidingClass);
        });

        this.sliding = true;
    };

    Slider.prototype.touchStarted = function(e) {
        console.log("touch started");
    };

    Slider.prototype.childTransitionEnded = function() {
        const slidingClass = "_sliding";

        if(this.sliding) {
            this.sliding = false;
            var self = this, children = this.element.children,
                nextIndex = this.index + 1 >= children.length ? 0 : this.index + 1;
                

            requestAnimationFrame(function() {
                removeClass(children[self.index], slidingClass);
                removeClass(children[nextIndex], slidingClass);

                removeClass(children[self.index], "_active");
                addClass(children[nextIndex], "_active");

                self.index = nextIndex;
            });
        }
    };

    function addClass(element, className) {
        if(!hasClass(element, className)) {
            element.className += " " + className;
        }
    };

    function removeClass(element, className) {
        const split = element.className.split(" ");
        var output = "", x, curr, found = false;

        for(x = 0; x < split.length; x++) {
            curr = split[x];

            if(curr !== className) {
                output += curr + " ";
            } else {
                found = true;
            }
        }

        if(found) {
            element.className = output;
        }
    };

    function hasClass(element, className) {
        const split = element.className.split(" ");
        var x, curr;

        for(x = 0; x < split.length; x++) {
            curr = split[x];

            if(curr === className) {
                return true;
            }
        }

        return false;
    };

    if(!window.SimpleSlider) {
        window.SimpleSlider = new SimpleSlider();
    } else {
        console.warn("SimpleSlider module conflicts with another object or module on this page.");
    }
})();