/** @jsx React.DOM */

var EventHandlersMixin = {
    keyCodes: {
        ESCAPE: 27,
        ARROW_DOWN: 40,
        ARROW_UP: 38,
        ENTER: 13
    },
    handleInputChange: function(event){
        var value = event.target.value;

        this.setProps({value: value});
        this.filterItems(value);
        if (this.onChange){
            this.onChange(value);
        }
    },
    handleArrowClick: function(){
        if (this.props.disabled){
            return false;
        }
        if (!this.state.isOpened){
            this.openDropDown();
            this.refs.textInput.getDOMNode().focus();
        } else {
            this.closeDropdownAndBringFocusBack();
        }
        return false;
    },
    openDropDownIfClosed: function(){
        if (!this.state.isOpened){
            this.openDropDown();
        }
    },
    handleKeys: function(event){
        var options = this.state.filteredOptions || this.props.options;
        var index = options.indexOf(this.state.selectedItem) || 0;

        this.openDropDownIfClosed();

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
                this.filterItems(this.refs.textInput.getDOMNode().value);
                this.closeDropDown();
                break;
            case this.keyCodes.ESCAPE:
                this.setState({selectedItem: null});
                this.closeDropDown();
                break;
            default:
                break;
        }
    }
};