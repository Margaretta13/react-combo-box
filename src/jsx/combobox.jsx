/** @jsx React.DOM */

var ComboBox = React.createClass({
    getInitialState: function() {
        return {
            isOpened: false
        };
    },
    handleArrowClick: function(){
        if (!this.state.isOpened){
            this.openDropDown();
            this.refs.textInput.getDOMNode().focus();
            return false;
        } else {
            this.closeDropDown();
        }
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

        var arrowClass = "reactcombobox__arrow " +
            (this.state.isOpened ? "reactcombobox__arrow_up" : "reactcombobox__arrow_down");

        return (
            <div className="reactcombobox">
                <div class="reactcombobox__input-wrap">
                    <a className={arrowClass} onClick={this.handleArrowClick} tabindex="-1"></a>
                    <input type="text" className="reactcombobox__input" ref="textInput"
                        onFocus={this.openDropDown} onBlur={this.closeDropDown}/>
                </div>
                <DropDownList data={this.props.options} show={this.state.isOpened}/>
            </div>
        );
    }
});