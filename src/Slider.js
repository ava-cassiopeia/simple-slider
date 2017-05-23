export default class Slider {

    constructor(data) {
        this.element = data.element || document.querySelector(data.selector);
        this.delay = data.delay || 5000;
        this.ready = false;
        this.counting = false;
        this.sliding = false;
        this.index = 0;
        this.isGoingForward = false;
        this.eventListeners = {};
        this.nextIndex = null;

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

    previous(index) {
        if(this.sliding) {
            return;
        }

        const slidingClass = "_sliding";
        const previousClass = "_prev";
        var children = this.element.children;
        var nextIndex = this.index - 1 < 0 ? children.length - 1 : this.index - 1;

        if(typeof index !== 'undefined') {
            nextIndex = index;
            this.nextIndex = index;
        }

        requestAnimationFrame(function() {
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

    next(index) {
        if(this.sliding) {
            return;
        }

        const slidingClass = "_sliding";
        var children = this.element.children;
        var nextIndex = this.index + 1 >= children.length ? 0 : this.index + 1;

        if(typeof index !== 'undefined') {
            nextIndex = index;
            this.nextIndex = index;
        }

        requestAnimationFrame(function() {
            children[this.index].classList.add(slidingClass);
            children[nextIndex].classList.add(slidingClass);
        }.bind(this));

        this.sliding = true;
        this.isGoingForward = true;

        this.emit("action.moving.next");
    }

    jumpTo(index) {
        // if the specified index is the index we're currently on OR the index
        // is out of bounds, do nothing
        if(index == this.index || index < 0 || index >= this.element.children.length) {
            return;
        }

        if(index > this.index) {
            this.next(index);
        } else {
            this.previous(index);
        }
    }

    touchStarted() {
        //console.log("touch started");
    }

    childTransitionEnded(e) {
        const slidingClass = "_sliding";

        if(this.sliding) {
            this.sliding = false;
            this.slidingDirection = 0;

            var children = this.element.children,
                nextIndex = 0;

            if(this.nextIndex) {
                nextIndex = this.nextIndex;
            } else {
                if(this.isGoingForward) {
                    nextIndex = this.index + 1 >= children.length ? 0 : this.index + 1;
                } else {
                    nextIndex = this.index - 1 < 0 ? children.length - 1 : this.index - 1;
                }
            }

            // reset the nextIndex keeper
            this.nextIndex = null;

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
