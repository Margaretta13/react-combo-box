/** @jsx React.DOM */

var ComboBox = React.createClass({
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
        var itemBlock = this.props.children || this.props.cutomItem || <DropDownItem/>;

        return (
            <div className="reactcombobox">
                <div className="reactcombobox__input-wrap">
                    <a className={classes} onMouseDown={this.handleArrowClick} tabIndex="-1"></a>

                    <input type="text" autoComplete="off" className="reactcombobox__input" ref="textInput"
                        value={this.state.value}
                        disabled={this.props.disabled}
                        onFocus={this.openDropDown}
                        onBlur={this.closeDropDown}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeys}/>
                </div>

                <DropDownList items={this.getActualOptions()}
                    titleField={this.props.titleField}
                    selected={this.state.selectedItem}
                    show={this.state.isOpened}
                    itemBlock={itemBlock}
                    onSelect={this.selectItemAndFilter}/>
            </div>
        );
    },
    selectItem: function(item){
        this.setState({selectedItem: item});

        var value = this.getValueOfItem(item, this.props.titleField);

        this.setState({value: value});

        if (this.props.onChange){
            this.props.onChange(value, item);
        }
        if (this.props.onItemSelected){
            this.props.onItemSelected(item);
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