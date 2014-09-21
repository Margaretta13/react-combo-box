/** @jsx React.DOM */

var DropDownItem = React.createClass({
    mixins: [ItemParserMixin],
    render: function() {

        return (
            <div>
                {this.getValueOfItem(this.props.item, this.props.titleField)}
            </div>
        );
    }
});