/** @jsx React.DOM */

var ComboInput = React.createClass({
    openDropDown: function(){

    },
    handleClick: function(){
        this.openDropDown();
    },
    render: function() {
        return (
            <input type="text" onFocus={this.openDropDown}/>
        );
    }
});