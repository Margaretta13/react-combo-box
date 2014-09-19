/** @jsx React.DOM */

var DropDownItem = React.createClass({
    render: function() {

        return (
            <div className="dropdown-item">
                {this.props.title}
            </div>
        );
    }
});