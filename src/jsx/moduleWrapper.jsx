/** @jsx React.DOM */

//wrap component to provide possibility to use with different module systems
(function(definition) {
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


    //= include ./dropDownItem.jsx
    //= include ./dropDownList.jsx
    //= include ./combobox.jsx


    return ComboBox;
});