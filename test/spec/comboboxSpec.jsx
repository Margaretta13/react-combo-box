/** @jsx React.DOM */

describe("combobox tests", function(){
	var testUtils = React.addons.TestUtils,
        fakeOptions = ["test1", "test2", "test3", "test4", "test5"],
        ESCAPE = 27,
        ARROW_DOWN = 40,
        ARROW_UP = 38,
        ENTER = 13;

	it("Should set provided value to input", function(){
		var testValue = "testValue";

		var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox options={[]} defaultValue={testValue} />
        );

        var inputValue = comboboxInstance.refs.textInput.getDOMNode().value;

        expect(inputValue).toEqual(testValue);
	});

	it("Should open dropdown on input focus", function(){
		var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox />
        );

        var inputNode = comboboxInstance.refs.textInput.getDOMNode();

        testUtils.Simulate.focus(inputNode);

        expect(comboboxInstance.state.isOpened).toBeTruthy();
	});

    it("Should open dropdown on arrow click and close after next click", function(done){
        var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox />
        );

        var arrowNode = comboboxInstance.getDOMNode().querySelector(".reactcombobox__arrow");

        testUtils.Simulate.mouseDown(arrowNode);

        expect(comboboxInstance.state.isOpened).toBeTruthy();

        testUtils.Simulate.mouseDown(arrowNode);

        setTimeout(function waitForDropdownCose(){
            expect(comboboxInstance.state.isOpened).toBeFalsy();
            done();
        }, 50);

    });

	it("Should render options into dropdown", function(){
		var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox options={fakeOptions} />
        );

        var dropDown = comboboxInstance.getDOMNode().querySelector(".reactcombobox__dropdown");

        expect(dropDown.innerHTML.indexOf(fakeOptions[0])!==-1).toBeTruthy();
	});

    it("Should call onItemSelected on selecting item", function(){
        var spyOnSelect = jasmine.createSpy('fakeOnSelect');

        var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox options={fakeOptions} onItemSelected={spyOnSelect}/>
        );

        comboboxInstance.selectItem(fakeOptions[2]);
        expect(spyOnSelect).toHaveBeenCalledWith(fakeOptions[2]);
    });

    it("Should change selected item on arrow pressing", function(){
        var spyOnSelect = jasmine.createSpy('fakeOnSelect');

        var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox options={fakeOptions} onItemSelected={spyOnSelect}/>
        );

        var inputNode = comboboxInstance.refs.textInput.getDOMNode();

        testUtils.Simulate.keyDown(inputNode, {keyCode: ARROW_DOWN});
        expect(spyOnSelect).toHaveBeenCalledWith(fakeOptions[0]);

        testUtils.Simulate.keyDown(inputNode, {keyCode: ARROW_DOWN});
        expect(spyOnSelect).toHaveBeenCalledWith(fakeOptions[1]);

        testUtils.Simulate.keyDown(inputNode, {keyCode: ARROW_UP});
        expect(spyOnSelect).toHaveBeenCalledWith(fakeOptions[0]);
    });

    it("Should close popup after ENTER pressed", function(){
        var comboboxInstance = testUtils.renderIntoDocument(
            <ComboBox options={fakeOptions}/>
        );

        var inputNode = comboboxInstance.refs.textInput.getDOMNode();

        testUtils.Simulate.focus(inputNode);

        testUtils.Simulate.keyDown(inputNode, {keyCode: ARROW_DOWN});
        testUtils.Simulate.keyDown(inputNode, {keyCode: ENTER});

        expect(comboboxInstance.state.isOpened).toBeFalsy();
    });

});