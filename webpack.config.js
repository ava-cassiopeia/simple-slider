var path = require("path");

module.exports = {
    entry: './src/SimpleSlider.js',
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'SimpleSlider.js',
        library: 'SimpleSlider'
    }
};
