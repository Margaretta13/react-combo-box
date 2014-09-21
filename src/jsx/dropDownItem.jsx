/** @jsx React.DOM */

var DropDownItem = React.createClass({
    render: function() {

        var titleField = this.props.titleField,
            item = this.props.item;

        var title = titleField ? item[titleField] : item;

        return (
            <div>
                {title}
            </div>
        );
    }
});