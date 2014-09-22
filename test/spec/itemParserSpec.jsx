/** @jsx React.DOM */

describe("itemParser tests", function(){

    it("Should provide value of prop, defined by titleField", function(){
        var value = ItemParserMixin.getValueOfItem({
            testName: "test"
        }, "testName");

        expect(value).toEqual("test");
    });

    it("Should return item if titleField not probided", function(){
        var value = ItemParserMixin.getValueOfItem("testvalue");

        expect(value).toEqual("testvalue");
    });

});