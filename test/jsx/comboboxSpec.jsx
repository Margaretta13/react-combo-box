describe("combobox tests", function(){
	var testUtils = React.addons.TestUtils;

	it("Should set provided value to input", function(){
		var testValue = "testValue";

		var comboboxInstance = testUtils.renderIntoDocument(
            ComboBox({options: [], defaultValue: testValue})
        );

        var inputValue = comboboxInstance.refs.textInput.getDOMNode().value;

        expect(inputValue).toEqual(testValue);
	});

	it("Should open dropdown on input focus", function(){
		var comboboxInstance = testUtils.renderIntoDocument(
            ComboBox(null)
        );

        var inputNode = comboboxInstance.refs.textInput.getDOMNode();

        testUtils.Simulate.focus(inputNode);

        expect(comboboxInstance.state.isOpened).toBeTruthy();
	});

	it("Should render options into dropdown", function(){
		var comboboxInstance = testUtils.renderIntoDocument(
            ComboBox({options: ["test1", "test2"]})
        );

        var dropDown = comboboxInstance.getDOMNode().querySelector(".reactcombobox__dropdown");

        expect(dropDown.innerHTML.indexOf("test1")!==-1).toBeTruthy();
	});

})