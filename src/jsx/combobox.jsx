/** @jsx React.DOM */

var ComboBox = React.createClass({
    getInitialState: function() {
        return {
            isOpened: false
        };
    },
    openDropDown: function(){
        this.setState({
            isOpened: true
        });
    },
    closeDropDown: function(){
        this.setState({
            isOpened: false
        });
    },
    render: function() {
        return (
            <div>
                <DropDownList data={["test", "test2"]} show={this.state.isOpened}/>
                <input type="text" onFocus={this.openDropDown} onBlur={this.closeDropDown}/>
            </div>
        );
    }
});