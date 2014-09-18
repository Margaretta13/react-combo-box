/** @jsx React.DOM */

var DropDownItem = React.createClass({
    render: function() {

        return (
            <div className="react-combobox-dropdown-item">
                {this.props.title}
            </div>
        );
    }
});