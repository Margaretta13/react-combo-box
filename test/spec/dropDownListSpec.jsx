/** @jsx React.DOM */

describe("dropDownList tests", function() {
    var testUtils = React.addons.TestUtils,
        fakeItems = ["test1", "test2", "test3", "test4"];


    it("Should render list of items", function () {
        var dropDownListInstance = testUtils.renderIntoDocument(
            <DropDownList
                items={fakeItems}
                itemBlock={DropDownItem(null)}/>
        );

        var domNode = dropDownListInstance.getDOMNode();

        expect(domNode.querySelector(".dropdown-item:nth-child(2)").innerHTML.indexOf(fakeItems[1])!==-1).toBeTruthy();
    });

    it("Should open dropdown if show===true", function () {
        var dropDownListInstance = testUtils.renderIntoDocument(
            <DropDownList show={false} itemBlock={DropDownItem(null)} />
        );

        var domNode = dropDownListInstance.getDOMNode();

        expect(domNode.style.display).toEqual("none");

        dropDownListInstance.setProps({show: true});

        expect(domNode.style.display).toEqual("block");
    });

    it("Should highlight selected item", function () {
        var dropDownListInstance = testUtils.renderIntoDocument(
            <DropDownList items={fakeItems} selected={fakeItems[1]} itemBlock={DropDownItem(null)} />
        );

        var domNode = dropDownListInstance.getDOMNode();
        var activeNode = domNode.querySelector(".dropdown-item_active");

        expect(activeNode.innerHTML.indexOf(fakeItems[1]) !== -1).toBeTruthy();
    });

    it("Should call onItemSelected on clicking by item", function () {
        var spyOnSelect = jasmine.createSpy('fakeOnSelect');

        var dropDownListInstance = testUtils.renderIntoDocument(
            <DropDownList items={fakeItems} itemBlock={DropDownItem(null)} onSelect={spyOnSelect}/>
        );

        var domNode = dropDownListInstance.getDOMNode();
        var firstItemNode = domNode.querySelector(".dropdown-item");

        testUtils.Simulate.mouseDown(firstItemNode);

        expect(spyOnSelect).toHaveBeenCalledWith(fakeItems[0]);
    });
});