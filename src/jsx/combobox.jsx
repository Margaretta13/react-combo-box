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
            <div className="reactcombobox">
                <div class="reactcombobox__input-wrap">
                    <a class="reactcombobox__arrow reactcombobox__arrow_up"></a>
                    <input type="text" className="reactcombobox__input" onFocus={this.openDropDown} onBlur={this.closeDropDown}/>
                </div>
                <DropDownList data={["test", "test2"]} show={this.state.isOpened}/>
            </div>
        );
    }
});