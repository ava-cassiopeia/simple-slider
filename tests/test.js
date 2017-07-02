describe("SimpleSlider", function() {
    it("should be available globally", function() {
        assert(!!window.SimpleSlider);
    });

    it("should expose the init() function", function() {
        assert(!!window.SimpleSlider.init);
        assert(typeof window.SimpleSlider.init === 'function');
    });
});
