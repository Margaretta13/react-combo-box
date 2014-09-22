/** @jsx React.DOM */

describe("optionsHelper tests", function() {

    var TestComponent,
        testComponentInstance,
        testUtils = React.addons.TestUtils,
        fakeFiltered = ["1","2","3"],
        fakeStateOptions = ["qwe", "rty"],
        fakePropsOptions = ["test1", "test2"];

    beforeEach(function(){
        TestComponent = React.createClass({
            mixins: [OptionsHelperMixin],
            render: function() {
                return <div />;
            }
        });

        testComponentInstance = testUtils.renderIntoDocument(
            TestComponent({options: fakePropsOptions})
        );
    });

    it("getActualOptions should return filtered if exist", function () {
        testComponentInstance.setState({
            options: fakeStateOptions,
            filteredOptions: fakeFiltered
        });

        expect(testComponentInstance.getActualOptions()).toEqual(fakeFiltered);
    });

    it("getActualOptions should return state.options if filtered not exist", function () {
        testComponentInstance.setState({
            options: fakeStateOptions
        });

        expect(testComponentInstance.getActualOptions()).toEqual(fakeStateOptions);
    });

    it("retrieveDataFromDataSource should update state.options after when source function return value", function () {
        var fakeSource = function(query, callback){
            expect(query).toEqual("testquery");
            callback(fakeFiltered);
        };

        testComponentInstance.setProps({source: fakeSource});

        testComponentInstance.retrieveDataFromDataSource("testquery");

        expect(testComponentInstance.state.options).toEqual(fakeFiltered);
    });

    it("filterItems should filter options with query", function () {

        testComponentInstance.setState({
            options: ["test1", "test2"]
        });

        testComponentInstance.filterItems("test1");

        expect(testComponentInstance.getActualOptions()).toEqual(["test1"]);
    });
});