/** @jsx React.DOM */

var ComboBox = React.createClass({
    render: function() {
        return (
            <DropDownItem data={["test", "test2"]}/>,
            <ComboInput/>
        );
    }
});