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
                    <input type="text" className="reactcombobox__input" ref="textInput"
                        value={this.props.value} onFocus={this.openDropDown}
                        onBlur={this.closeDropDown} onChange={this.handleInputChange} onKeyDown={this.handleKeys}/>
                </div>

                <DropDownList items={this.state.filteredOptions ||this.props.options} selected={this.state.selectedItem}
                    show={this.state.isOpened} itemBlock={itemBlock} onSelect={this.selectItem}/>
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