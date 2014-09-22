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
        window.ReactComboBox = definition();  // Browser
    }
})(function() {
    "use strict";
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

        this.setState({value: value});
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
        var options = this.getActualOptions();
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
/** @jsx React.DOM */

var ItemParserMixin = {
    getValueOfItem: function(item, titleField){
        var value = titleField ? item[titleField] : item;
        return value;
    }
};
/** @jsx React.DOM */

var OptionsHelperMixin = {
    getActualOptions: function(){
        return this.state.filteredOptions || this.state.options || this.props.options;
    },
    retrieveDataFromDataSource: function(inputValue){

        var onLoaded = function(newOptions){
            this.setState({
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

            var filteredOptions = this.getActualOptions().filter(function(item){
                var value = this.props.titleField ? item[this.props.titleField] : item;
                return value.indexOf(query) !== -1;
            }.bind(this));

            this.setState({filteredOptions: filteredOptions});
        } else {
            this.setState({filteredOptions: null});
        }
    }
};

/** @jsx React.DOM */

var DropDownItem = React.createClass({displayName: 'DropDownItem',
    mixins: [ItemParserMixin],
    render: function() {

        return (
            React.DOM.div(null, 
                this.getValueOfItem(this.props.item, this.props.titleField)
            )
        );
    }
});

/** @jsx React.DOM */

var DropDownList = React.createClass({displayName: 'DropDownList',
    getDefaultProps: function() {
        return {
            items: []
        };
    },
    onItemSelected : function(item){
        this.props.onSelect(item);
    },
    generateItemKey: function(item){
        if (typeof item === "string"){
            return item;
        }
        //use jsonned object as unique hash key of object
        return JSON.stringify(item);
    },
    render: function() {

        var listItems = this.props.items.map(function (item) {

            var itemElement =  React.addons.cloneWithProps(this.props.itemBlock, {
                item: item,
                titleField: this.props.titleField
            });

            var classes = React.addons.classSet({
                'dropdown-item': true,
                'dropdown-item_active': item === this.props.selected
            });

            var bindedClick = this.onItemSelected.bind(this, item);

            return (React.DOM.div({className: classes, key: this.generateItemKey(item), onMouseDown: bindedClick}, 
                        itemElement
                    )
            );

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
    mixins: [EventHandlersMixin, OptionsHelperMixin, ItemParserMixin],
    propTypes: {
        //array of predefined options
        options: React.PropTypes.array,
        //an default value for input. To change value after mounting component, please use setValue method
        defaultValue: React.PropTypes.string,
        //or datasource function. Can return a promise. Input value and callback will be passed into source function
        source: React.PropTypes.func,
        //if options is array of objects, this param describe what field of object should combobox display into dropdown list
        titleField: React.PropTypes.string,
        //onChange triggering after every input change. Input value and selected item (if selected) will be passed into onChange function
        onChange: React.PropTypes.func,
        //selecting item from provided optons will trigger onItemSelected(item)
        onItemSelected: React.PropTypes.func,
        //custom item component, also can be passed as child of ComboBox
        cutomItem: React.PropTypes.component,
        //disable or enable combobox by changing "disabled" property
        disabled: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            isOpened: false,
            value: this.props.defaultValue
        };
    },
    getDefaultProps: function() {
        return {
            defaultValue: "",
            options: []
        };
    },
    componentDidMount: function(){
        if (this.props.source){
            this.retrieveDataFromDataSource();
        } else if (this.props.defaultValue){
            this.filterItems(this.props.defaultValue);
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
                    React.DOM.a({className: classes, onMouseDown: this.handleArrowClick, tabIndex: "-1"}), 

                    React.DOM.input({type: "text", autoComplete: "off", className: "reactcombobox__input", ref: "textInput", 
                        value: this.state.value, 
                        disabled: this.props.disabled, 
                        onFocus: this.openDropDown, 
                        onBlur: this.closeDropDown, 
                        onChange: this.handleInputChange, 
                        onKeyDown: this.handleKeys})
                ), 

                DropDownList({items: this.getActualOptions(), 
                    titleField: this.props.titleField, 
                    selected: this.state.selectedItem, 
                    show: this.state.isOpened, 
                    itemBlock: itemBlock, 
                    onSelect: this.selectItemAndFilter})
            )
        );
    },
    selectItem: function(item){
        this.setState({selectedItem: item});

        var value = this.getValueOfItem(item, this.props.titleField);

        this.setState({value: value});

        if (this.onChange){
            this.onChange(value, item);
        }
        if (this.onItemSelected){
            this.onItemSelected(item);
        }
    },
    selectItemAndFilter: function(item){
        this.filterItems(this.getValueOfItem(item, this.props.titleField));
        this.selectItem(item);
        this.closeDropdownAndBringFocusBack();
    },
    openDropDown: function(){
        this.setState({isOpened: true});
    },
    closeDropDown: function(){
        this.setState({isOpened: false});
    },
    setValue: function(newValue){
        this.setState({value: newValue});
        this.filterItems(newValue);
    },
    closeDropdownAndBringFocusBack: function(){
        var supportedIntervalMethod = window.requestAnimationFrame ? window.requestAnimationFrame : window.setTimeout;

        supportedIntervalMethod.call(window, function(){
            this.refs.textInput.getDOMNode().focus();
            this.closeDropDown();
        }.bind(this));

    }
});



    return ComboBox;
});