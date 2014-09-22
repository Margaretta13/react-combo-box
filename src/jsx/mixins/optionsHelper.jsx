/** @jsx React.DOM */

var OptionsHelperMixin = {
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

            var filteredOptions = this.state.options.filter(function(item){
                var value = this.props.titleField ? item[this.props.titleField] : item;
                return value.indexOf(query) !== -1;
            }.bind(this));

            this.setState({filteredOptions: filteredOptions});
        } else {
            this.setState({filteredOptions: null});
        }
    }
};