/** @jsx React.DOM */

var ComboBox = React.createClass({
    propTypes: {
        //array of predefined options
        options: React.PropTypes.array,
        //or datasource function. Can return a promise. Input value and calback will pass into function
        source: React.PropTypes.func,
        //custom item component, also can be passed as child of ComboBox
        cutomItem: React.PropTypes.component
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
            'reactcombobox__arrow_up': this.state.isOpened,
            'reactcombobox__arrow_down': !this.state.isOpened
        });

        //support custom drop down item
        var itemBlock = this.props.children || this.props.cutomItem || <DropDownItem/>;

        return (
            <div className="reactcombobox">
                <div className="reactcombobox__input-wrap">
                    <a className={classes} onClick={this.handleArrowClick} tabIndex="-1"></a>
                    <input type="text" className="reactcombobox__input" ref="textInput" value={this.props.value}
                        onFocus={this.openDropDown} onBlur={this.closeDropDown} onChange={this.handleInputChange}/>
                </div>

                <DropDownList items={this.state.filteredOptions ||this.props.options} show={this.state.isOpened} itemBlock={itemBlock}/>
            </div>
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
    handleInputChange: function(event){
        this.setProps({value: event.target.value});
        this.filterItems(event.target.value);
    },
    filterItems: function(query){
        if (this.props.source){
            this.retrieveDataFromDataSource(query);
        } else {
            var allOptions = this.props.options;
            var filteredOptions = [];

            for (var i = 0, len = allOptions.length; i<len; i++){
                var option = allOptions[i];

                if (option.indexOf(query) !== -1){
                    filteredOptions.push(option);
                }
            }
            this.setState({filteredOptions: filteredOptions});
        }
    },
    handleArrowClick: function(){
        if (!this.state.isOpened){
            this.openDropDown();
            this.refs.textInput.getDOMNode().focus();
            return false;
        } else {
            this.closeDropDown();
            this.refs.textInput.getDOMNode().blur();
        }
    },
    openDropDown: function(){
        this.setState({isOpened: true});
    },
    closeDropDown: function(){
        this.setState({isOpened: false});
    },
});