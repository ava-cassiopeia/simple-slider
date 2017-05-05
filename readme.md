# SimpleSlider.js

Yet another slider Javascript module. Built because I don't like how other
sliders work.

Major features:

 - No dependencies, just native Javascript
 - No inline styles
 - Simple API
 - Integration with your workflow/build process

## Browser Support

Supports ~77.66% of browsers; specifically supporting modern versions of all
browsers but Internet Explorer, which this plugin fully isn't supported in,
primarily due to the use of the `Promise` object.

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
