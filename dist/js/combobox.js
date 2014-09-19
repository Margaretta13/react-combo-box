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

var DropDownItem = React.createClass({displayName: 'DropDownItem',
    render: function() {

        return (
            React.DOM.div({className: "dropdown-item"}, 
                this.props.title
            )
        );
    }
});

/** @jsx React.DOM */

var DropDownList = React.createClass({displayName: 'DropDownList',
    render: function() {

        var listItems = this.props.data.map(function (item) {
            return (
                    DropDownItem({title: item})
                );
        });

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

        return (
            React.DOM.div({className: "reactcombobox"}, 
                React.DOM.div({className: "reactcombobox__input-wrap"}, 
                    React.DOM.a({className: classes, onClick: this.handleArrowClick, tabIndex: "-1"}), 
                    React.DOM.input({type: "text", className: "reactcombobox__input", ref: "textInput", 
                        onFocus: this.openDropDown, onBlur: this.closeDropDown})
                ), 
                DropDownList({data: this.props.options, show: this.state.isOpened})
            )
        );
    }
});



    return ComboBox;
});