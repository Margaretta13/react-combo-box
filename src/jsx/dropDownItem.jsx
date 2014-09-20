/** @jsx React.DOM */

var DropDownItem = React.createClass({
    render: function() {

        return (
            <div>
                {this.props.item}
            </div>
        );
    }
});