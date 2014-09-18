/** @jsx React.DOM */

var DropDownItem = React.createClass({
    render: function() {
        var listItems = this.props.data.map(function (item) {
            return (
                <div className="react-combobox-dropdown-item">{item}</div>
            );
        });

        return (
            <div className="react-combobox-dropdown-item">
                {listItems}
            </div>
        );
    }
});