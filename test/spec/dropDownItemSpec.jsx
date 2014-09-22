/** @jsx React.DOM */

describe("dropDownItemSpec tests", function() {
    var testUtils = React.addons.TestUtils;

    it("Should render item value", function () {
        var testValue = "testValue";

        var dropDownItemInstance = testUtils.renderIntoDocument(
            <DropDownItem item="{testValue}"/>
        );

        var domNode = dropDownItemInstance.getDOMNode();

        expect(domNode.innerHTML.indexOf(testValue)!==-1).toBeTruthy();
    });
});