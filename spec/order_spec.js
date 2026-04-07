describe("Emma's Cafe chatbot", function () {
    beforeEach(function () {
        clearInput();
    });
    it("welcome test", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Emma's Cafe.");
    });
    it("menu test", function () {
        handleInput("hello");
        const results = handleInput("menu");
        expect(results[0]).toBe("Our Drinks:");
    });
});