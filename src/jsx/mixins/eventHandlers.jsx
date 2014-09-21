/** @jsx React.DOM */

var EventHandlersMixin = {
    keyCodes: {
        ESCAPE: 27,
        ARROW_DOWN: 40,
        ARROW_UP: 38,
        ENTER: 13
    },
    handleInputChange: function(event){
        this.setProps({value: event.target.value});
        this.filterItems(event.target.value);
    },
    handleArrowClick: function(){
        if (this.props.disabled){
            return false;
        }
        if (!this.state.isOpened){
            this.openDropDown();
            this.refs.textInput.getDOMNode().focus();
            return false;
        } else {
            this.closeDropDown();
            this.refs.textInput.getDOMNode().blur();
        }
    },
    handleKeys: function(event){
        var options = this.state.filteredOptions || this.props.options;
        var index = options.indexOf(this.state.selectedItem) || 0;

        switch(event.keyCode){
            case this.keyCodes.ARROW_DOWN:
                index++;
                if (index >= options.length){
                    index = 0;
                }
                this.selectItem(options[index]);
                return false;
            case  this.keyCodes.ARROW_UP:
                index--;
                if (index < 0){
                    index = options.length-1;
                }
                this.selectItem(options[index]);
                return false;
            case this.keyCodes.ENTER:
                this.filterItems(this.state.selectedItem);
                this.refs.textInput.getDOMNode().blur();
                break;
            case this.keyCodes.ESCAPE:
                this.setState({selectedItem: null});
                this.refs.textInput.getDOMNode().blur();
                break;
            default:
                break;
        }
    }
};