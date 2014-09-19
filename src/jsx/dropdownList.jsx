/** @jsx React.DOM */

var DropDownList = React.createClass({
    render: function() {

        var listItems = this.props.data.map(function (item) {
            return React.addons.cloneWithProps(this.props.itemBlock, {
                title: item
            });
        }.bind(this));

        var displayMode = this.props.show ? "block" : "none";

        return (
                <div className="reactcombobox__dropdown" style={{display: displayMode}}>
                    {listItems}
                </div>
            );
    }
});