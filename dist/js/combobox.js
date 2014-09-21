/** @jsx React.DOM */

//wrap component to provide possibility to use with different module systems
(function(definition) {
    "use strict";

    if (typeof exports === 'object') {
        module.exports = definition(); // CommonJS
    }
    else if (typeof define === 'function' && define.amd) {
        define([], definition); // AMD
    }
    else {
        window.ReactComboBox = {    // Browser
            ComboBox : definition()
        };
    }
})(function() {
    "use strict";
/** @jsx React.DOM */

var KEY_CODES = Object.freeze({
    ESCAPE: 27,
    ARROW_DOWN: 40,
    ARROW_UP: 38,
    ENTER: 13
});

/** @jsx React.DOM */

var EventHandlersMixin = {
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
            case KEY_CODES.ARROW_DOWN:
                index++;
                if (index >= options.length){
                    index = 0;
                }
                this.selectItem(options[index]);
                return false;
            case  KEY_CODES.ARROW_UP:
                index--;
                if (index < 0){
                    index = options.length-1;
                }
                this.selectItem(options[index]);
                return false;
            case KEY_CODES.ENTER:
                this.filterItems(this.state.selectedItem);
                this.refs.textInput.getDOMNode().blur();
                break;
            case KEY_CODES.ESCAPE:
                this.setState({selectedItem: null});
                this.refs.textInput.getDOMNode().blur();
                break;
            default:
                break;
        }
    },
};

/** @jsx React.DOM */

var DropDownItem = React.createClass({displayName: 'DropDownItem',
    render: function() {

        return (
            React.DOM.div(null, 
                this.props.item
            )
        );
    }
});

/** @jsx React.DOM */

var DropDownList = React.createClass({displayName: 'DropDownList',
    onItemSelected : function(item){
        this.props.onSelect(item);
    },
    render: function() {
        this.props.items = this.props.items || [];

        var listItems = this.props.items.map(function (item) {

            var itemElement =  React.addons.cloneWithProps(this.props.itemBlock, {
                item: item
            });

            var classes = React.addons.classSet({
                'dropdown-item': true,
                'dropdown-item_active': item === this.props.selected
            });

            var bindedClick = this.onItemSelected.bind(this, item);

            return React.DOM.div({className: classes, key: item, onMouseDown: bindedClick}, itemElement);
        }.bind(this));

        var displayMode = this.props.show ? "block" : "none";

        return (
                React.DOM.div({className: "reactcombobox__dropdown", style: {display: displayMode}}, 
                    listItems
                )
            );
    }
});

/** @jsx React.DOM */

var ComboBox = React.createClass({displayName: 'ComboBox',
    mixins: [EventHandlersMixin],
    propTypes: {
        //array of predefined options
        options: React.PropTypes.array,
        //or datasource function. Can return a promise. Input value and calback will pass into function
        source: React.PropTypes.func,
        //every input change will call onChange function
        onChange: React.PropTypes.func,
        //custom item component, also can be passed as child of ComboBox
        cutomItem: React.PropTypes.component,
        //disable or enable combobox by changing "disabled" attribute
        disabled: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            isOpened: false
        };
    },
    componentDidMount: function(){
        if (!this.props.options){
            this.retrieveDataFromDataSource();
        }
    },
    render: function() {

        var classes = React.addons.classSet({
            'reactcombobox__arrow': true,
            'reactcombobox__arrow_disabled': this.props.disabled,
            'reactcombobox__arrow_up': this.state.isOpened,
            'reactcombobox__arrow_down': !this.state.isOpened
        });

        //support custom drop down item
        var itemBlock = this.props.children || this.props.cutomItem || DropDownItem(null);

        return (
            React.DOM.div({className: "reactcombobox"}, 
                React.DOM.div({className: "reactcombobox__input-wrap"}, 
                    React.DOM.a({className: classes, onClick: this.handleArrowClick, tabIndex: "-1"}), 
                    React.DOM.input({type: "text", className: "reactcombobox__input", ref: "textInput", 
                        value: this.props.value, disabled: this.props.disabled, onFocus: this.openDropDown, 
                        onBlur: this.closeDropDown, onChange: this.handleInputChange, onKeyDown: this.handleKeys})
                ), 

                DropDownList({items: this.state.filteredOptions ||this.props.options, selected: this.state.selectedItem, 
                    show: this.state.isOpened, itemBlock: itemBlock, onSelect: this.selectItem})
            )
        );
    },
    retrieveDataFromDataSource: function(inputValue){

        var onLoaded = function(newOptions){
            this.setProps({
                options: newOptions
            });
        }.bind(this);

        var probablyPromise = this.props.source(inputValue, onLoaded);

        if (probablyPromise && probablyPromise.then){
            probablyPromise.then(onLoaded);
        }
    },
    filterItems: function(query){
        if (this.props.source){
            this.retrieveDataFromDataSource(query);
        } else if (query){

            var filteredOptions = this.props.options.filter(function(item){
                return item.indexOf(query) !== -1;
            });

            this.setState({filteredOptions: filteredOptions});
        } else {
            this.setState({filteredOptions: null});
        }
    },
    selectItem: function(item){
        this.setState({selectedItem: item});
        this.setProps({value: item});
        this.onChange(item);
    },
    openDropDown: function(){
        this.setState({isOpened: true});
    },
    closeDropDown: function(){
        this.setState({isOpened: false});
    },
});



    return ComboBox;
});