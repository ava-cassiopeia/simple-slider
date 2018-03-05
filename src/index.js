import {SimpleSlider as SliderController} from "./SimpleSlider.js";

var __slideController = new SliderController();

/**
 * @param {Object} data
 * @param {HTMLElement} data.element
 * @param {String} data.selector
 * @param {Number=} data.delay Defaults to 5000
 * @param {Boolean} data.paused Defaults to false 
 */
export var init = function(data) {
    return __slideController.init(data);
};
