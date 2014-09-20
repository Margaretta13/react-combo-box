/** @jsx React.DOM */

var DropDownList = React.createClass({
    render: function() {
        this.props.items = this.props.items || [];

        var listItems = this.props.items.map(function (item) {

            var itemElement =  React.addons.cloneWithProps(this.props.itemBlock, {
                item: item
            });

            var classes = React.addons.classSet({
                'dropdown-item': true,
                'dropdown-item_active': item === this.props.selected
            });

            return <div className={classes}>{itemElement}</div>;
        }.bind(this));

        var displayMode = this.props.show ? "block" : "none";

        return (
                <div className="reactcombobox__dropdown" style={{display: displayMode}}>
                    {listItems}
                </div>
            );
    }
});