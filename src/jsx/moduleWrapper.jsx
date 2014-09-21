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

    //= include ./mixins/eventHandlers.jsx
    //= include ./mixins/optionsHelper.jsx
    //= include ./dropDownItem.jsx
    //= include ./dropDownList.jsx
    //= include ./combobox.jsx


    return ComboBox;
});