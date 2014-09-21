/** @jsx React.DOM */

var OptionsHelperMixin = {
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
    }
};