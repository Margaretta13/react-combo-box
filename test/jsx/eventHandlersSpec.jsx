/** @jsx React.DOM */

describe("eventHandler tests", function(){
    var TestComponent,
        testComponentInstance,
        testUtils = React.addons.TestUtils,
        fakePropsOptions = ["test1", "test2"];

    beforeEach(function(){
        TestComponent = React.createClass({
            mixins: [EventHandlersMixin],
            render: function() {
                return <div />;
            }
        });

        testComponentInstance = testUtils.renderIntoDocument(
            TestComponent({options: fakePropsOptions})
        );
    });

    it("Should filter items in handleInputChange", function(){
        testComponentInstance.filterItems = function(value){
            expect(value).toEqual("test");
        };

        var fakeEvent = {
            target:{
                value: "test"
            }
        };

        testComponentInstance.handleInputChange(fakeEvent);
    });

    it("Should open dropdown if closed on handleArrowClick", function(){
        testComponentInstance.openDropDown = function(){};
        spyOn(testComponentInstance, "openDropDown");

        testComponentInstance.setState({
            isOpened: false
        });

        //fake input ref
        testComponentInstance.refs = {
            textInput: {
                getDOMNode: function(){
                    return {
                        focus: function(){}
                    }
                }
            }
        };

        testComponentInstance.handleArrowClick();

        expect(testComponentInstance.openDropDown).toHaveBeenCalled();
    });

});