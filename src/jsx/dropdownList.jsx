/** @jsx React.DOM */

var DropDownList = React.createClass({
    render: function() {

        var listItems = this.props.data.map(function (item) {
            return (
                    <DropDownItem title={item} />
                );
        });

        var displayMode = this.props.show ? "block" : "none";

        return (
                <div className="react-combobox-dropdown" style={{display: displayMode}}>
                    {listItems}
                </div>
            );
    }
});