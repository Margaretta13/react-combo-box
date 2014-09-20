/** @jsx React.DOM */

var DropDownList = React.createClass({
    render: function() {

        var listItems = this.props.data.map(function (item) {
            var itemElement =  React.addons.cloneWithProps(this.props.itemBlock, {
                item: item,
            });
            return <div className="dropdown-item">{itemElement}</div>;
        }.bind(this));

        var displayMode = this.props.show ? "block" : "none";

        return (
                <div className="reactcombobox__dropdown" style={{display: displayMode}}>
                    {listItems}
                </div>
            );
    }
});