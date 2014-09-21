/** @jsx React.DOM */

var DropDownList = React.createClass({
    onItemSelected : function(item){
        this.props.onSelect(item);
    },
    generateItemKey: function(item){
        if (typeof item === "string"){
            return item;
        }
        //use jsonned object as unique hash key of object
        return JSON.stringify(item);
    },
    render: function() {
        this.props.items = this.props.items || [];

        var listItems = this.props.items.map(function (item) {

            var itemElement =  React.addons.cloneWithProps(this.props.itemBlock, {
                item: item,
                titleField: this.props.titleField
            });

            var classes = React.addons.classSet({
                'dropdown-item': true,
                'dropdown-item_active': item === this.props.selected
            });

            var bindedClick = this.onItemSelected.bind(this, item);

            return (<div className={classes} key={this.generateItemKey(item)} onMouseDown={bindedClick}>
                        {itemElement}
                    </div>
            );

        }.bind(this));

        var displayMode = this.props.show ? "block" : "none";

        return (
                <div className="reactcombobox__dropdown" style={{display: displayMode}}>
                    {listItems}
                </div>
            );
    }
});