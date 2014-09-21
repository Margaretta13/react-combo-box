/** @jsx React.DOM */

var ItemParserMixin = {
    getValueOfItem: function(item, titleField){
        var value = titleField ? item[titleField] : item;
        return value;
    }
};