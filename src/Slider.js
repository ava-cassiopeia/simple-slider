export default class Slider {

    constructor(data) {
        this.element = data.element || document.querySelector(data.selector);
        this.delay = data.delay || 5000;
        this.ready = false;
        this.counting = false;
        this.sliding = false;
        this.index = 0;
        this.isGoingForward = false;
        this.lastTouch = null;
        this.eventListeners = {};

        this.setup();
    }

    setup() {
        var x, child, children = this.element.children;

        this.element.className += " _simple_slider";

        for(x = 0; x < children.length; x++) {
            child = children[x];

            if(x == 0) {
                child.className += " _slide _active";
            } else {
                child.className += " _slide";
            }

            child.addEventListener("transitionend", function(e) {
                this.childTransitionEnded(e);
            }.bind(this), false);

            child.addEventListener("touchstart", function(e) {
                this.touchStarted(e);
            }.bind(this), false);

            child.addEventListener("touchmove", function(e) {
                this.touchMove(e);
            }.bind(this), false);

            child.addEventListener("touchend", function(e) {
                this.touchEnded(e);
            }.bind(this), false);
        }

        this.ready = true;
        this.startCounting();
    }

    addEventListener(eventName, callback) {
        eventName = eventName || "__";

        if(!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }

        this.eventListeners[eventName].push(callback);
    }

    emit(eventName, data) {
        if(eventName) {
            this.notifyEventListeners(eventName, data);
        }

        this.notifyEventListeners("__", data, eventName);
    }

    notifyEventListeners(eventName, data, eventNameOverride) {
        if(!this.eventListeners[eventName]) {
            return;
        }

        var x, listener, listeners = this.eventListeners[eventName];

        for(x = 0; x < listeners.length; x++) {
            listener = listeners[x];

            listener(eventNameOverride || eventName, data, this);
        }
    }

    startCounting() {
        if(this.counting) {
            console.warn("Slider is already counting!");
            return;
        } else {
            this.counting = true;

            setInterval(function() {
                this.tick();
            }.bind(this), this.delay);
        }
    }

    tick() {
        this.next();
    }

    previous() {
        if(this.sliding) {
            return;
        }

        const slidingClass = "_sliding";
        const previousClass = "_prev";
        var children = this.element.children;

        requestAnimationFrame(function() {
            var nextIndex = this.index - 1 < 0 ? children.length - 1 : this.index - 1;

            children[this.index].classList.add(previousClass);
            children[nextIndex].classList.add(previousClass);

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    children[this.index].classList.add(slidingClass);
                    children[nextIndex].classList.add(slidingClass);
                }.bind(this));
            }.bind(this));
        }.bind(this));

        this.sliding = true;
        this.isGoingForward = false;

        this.emit("action.moving.previous");
    }

    next() {
        if(this.sliding) {
            return;
        }

        const slidingClass = "_sliding";
        var children = this.element.children;

        requestAnimationFrame(function() {
            var nextIndex = this.index + 1 >= children.length ? 0 : this.index + 1;

            children[this.index].classList.add(slidingClass);
            children[nextIndex].classList.add(slidingClass);
        }.bind(this));

        this.sliding = true;
        this.isGoingForward = true;

        this.emit("action.moving.next");
    }

    touchStarted(e) {
        if(this.sliding) {
            return;
        }

        this.sliding = true;

        this.lastTouch = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            dragPosition: {
                x: 0,
                y: 0
            }
        };
    }

    touchMove(e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        var diffX = x - this.lastTouch.x;
        var diffY = y - this.lastTouch.y;

        this.lastTouch.x = x;
        this.lastTouch.y = y;
        this.lastTouch.dragPosition.x += diffX;
        this.lastTouch.dragPosition.y += diffY;

        this.updateDragLocation();
    }

    touchEnded(e) {
        var activeSlide = this.element.children[this.index];

        this.sliding = false;
        activeSlide.style.transform = "";
    }

    updateDragLocation() {
        var activeSlide = this.element.children[this.index];


        requestAnimationFrame(function() {
            activeSlide.style.transform = "translateX(" + this.lastTouch.dragPosition.x + "px)";
        }.bind(this));
    }

    childTransitionEnded(e) {
        const slidingClass = "_sliding";

        if(this.sliding) {
            this.sliding = false;
            this.slidingDirection = 0;

            var children = this.element.children,
                nextIndex = 0;

            if(this.isGoingForward) {
                nextIndex = this.index + 1 >= children.length ? 0 : this.index + 1;
            } else {
                nextIndex = this.index - 1 < 0 ? children.length - 1 : this.index - 1;
            }

            requestAnimationFrame(function() {
                children[this.index].classList.remove(slidingClass);
                children[nextIndex].classList.remove(slidingClass);

                children[this.index].classList.remove("_active");
                children[nextIndex].classList.add("_active");

                if(!this.isGoingForward) {
                    children[this.index].classList.remove("_prev");
                    children[nextIndex].classList.remove("_prev");
                }

                this.index = nextIndex;

                this.emit("index.changed", this.index);
            }.bind(this));
        }
    }

}
