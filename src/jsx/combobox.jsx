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

        var classes = React.addons.classSet({
            'reactcombobox__arrow': true,
            'reactcombobox__arrow_up': this.state.isOpened,
            'reactcombobox__arrow_down': !this.state.isOpened
        });

        //support custom drop down item
        var itemBlock = this.props.children || <DropDownItem/>;

        return (
            <div className="reactcombobox">
                <div className="reactcombobox__input-wrap">
                    <a className={classes} onClick={this.handleArrowClick} tabIndex="-1"></a>
                    <input type="text" className="reactcombobox__input" ref="textInput"
                        onFocus={this.openDropDown} onBlur={this.closeDropDown}/>
                </div>

                <DropDownList data={this.props.options} show={this.state.isOpened} itemBlock={itemBlock}/>
            </div>
        );
    }
});