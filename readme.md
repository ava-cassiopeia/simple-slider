# SimpleSlider.js

Yet another slider Javascript module. Built because I don't like how other
sliders work.

Major features:

 - Performant
 - No dependencies, just native Javascript
 - No inline styles
 - Simple API
 - Integration with your workflow/build process

---

 - [Quickstart](#quickstart)
 - [Browser Support](#browser-support)
 - [Integration/Installation](#integrationinstallation)
   - [Javascript](#javascript)
   - [CSS](#css)
 - [Examples](#examples)
   - [Simple Setup](#simple-setup)
   - [Custom Delay Between Slides](#custom-delay-between-slides)
 - [Config Options](#config-options)
 - [SASS](#sass)
   - [Move Speed](#move-speed)
 - [Events](#events)
   - [Moving to Next Slide Event](#moving-to-next-slide-event)
   - [Moving to Previous Slide Event](#moving-to-previous-slide-event)
   - [Index Changed Event](#index-changed-event)

## Quickstart

*Note: this quickstart requires [webpack](https://webpack.github.io/) and
[NPM](https://www.npmjs.com/)*

First, get Simple Slider from NPM:

```
npm i --save a-simple-slider
```

Then import `SimpleSlider` from that package in your webpack'd file:

```
import {SimpleSlider} from "a-simple-slider";
```

Finally, make sure to somehow include the CSS/SASS file associated with this
project.

And you're set to start using Simple Slider. See the
[Simple Setup](#simple-setup) instructions to setup your first slider!

## Browser Support

Supports ~88.39% ([source](http://caniuse.com/#search=Promise)) of browsers;
specifically supporting modern versions of all browsers but Internet Explorer,
which this plugin fully isn't supported in, primarily due to the use of the
`Promise` object.

## Integration/Installation

SimpleSlider.js has both CSS and JS dependencies, which you can integrate into
your build/site below.

*Note:* All paths specified below are project-relative to *this* project, and
you may need to move those files to the right spot in *your* project.

### Javascript

Either directly import the `dist/js/simple-slider.min.js` file into your page,
or integrate `src/SimpleSlider.js` into your build process.

### CSS

Either directly import the `dist/css/SimpleSlider.css` into your stylesheet or
page, or you can integrate the slider into your SASS build by importing the
`sass/SimpleSlider.scss` into your build.

## Examples

Below are a few examples. Expect more detailed examples/documentation in the
Wiki and on the demo site.

### Simple Setup

```
SimpleSlider.init({
    selector: "#my-slider"
});
```
or
```
SimpleSlider.init({
    element: document.getElementById("#my-slider")
});
```

### Custom Delay Between Slides

```
SimpleSlider.init({
    selector: "#my-slider",
    delay: 10000 // in milliseconds
});
```

## Config Options

The setup configuration object for a Simple Slider takes a number of options,
which are documented below.

| Name | Key | Type | Default | Required? | Description |
| ---- | --- | ---- | ------- | --------- | ----------- |
| Element | `element` | HTMLElement | null | Yes* | The HTMLElement object representing the slider itself. Required if the `selector` option isn't set |
| Selector | `selector` | String | null | Yes* | The CSS selector that selects the HTMLElement representing the slider itself. Required if the `element` option isn't set |
| Delay | `delay` | Integer | 5000 | No | The delay that the slider waits (in milliseconds) before switching to the next slide |
| Paused | `paused` | Boolean | False | No | Sets the paused state of the Slider. If true, the slider will not automatically switch between slides after a delay |

## SASS

You can, if you would like, include the SASS file located in `sass/` into your
project build. If so, the below default variables are available to override.

### Move Speed

Variable Name: `$simple-slider_move-speed`<br />
Default: `1000ms`

This controls how fast the slider changes between slides. Can be any normal
unit of time.

## Events

The slider can emit events that will allow you to tie into what the slider is
doing. Those are listed below.

To listen to a specific event, you can specify the event like so:

```
slider.addEventListener("eventName", function(eventName, data, slider) {
    // do something when the event is fired here
});
```

To listen to any event emitted by the slider, just set the `eventName` parameter
to `null` or equivalent:

```
slider.addEventListener(null, function(eventName, data, slider) {
    // do something when any event is fired.
    // You can use the eventName parameter to figure out what event happened
});
```

### Moving to Next Slide Event

Name: `action.moving.next`

Fired when the slider starts to move to the next slide in sequence.

### Moving to the Previous Slide Event

Name: `action.moving.previous`

Fired when the slider starts to move to the previous slide in sequence.

### Index Changed Event

Name: `index.changed`

Fired when the index of the active slide changes. Includes the index that the
slider changed to.

*Note:* this is fired at the *end* of the sliding animation.
