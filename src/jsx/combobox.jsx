/** @jsx React.DOM */

var ComboBox = React.createClass({
    mixins: [EventHandlersMixin, OptionsHelperMixin, ItemParserMixin],
    propTypes: {
        //array of predefined options
        options: React.PropTypes.array,
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
            options: [],
            value: this.props.value
        };
    },
    getDefaultProps: function() {
        return {
            options: []
        };
    },
    componentDidMount: function(){
        this.updateStateIfPropsChanged(this.props);  

        if (this.props.source){
            this.retrieveDataFromDataSource();
        } else {
            this.filterItems(this.props.value);
        }
    },
    componentWillReceiveProps: function(newProps){
        this.updateStateIfPropsChanged(newProps);        
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

                    <input type="text" autocomplete="off" className="reactcombobox__input" ref="textInput"
                        value={this.state.value}
                        disabled={this.props.disabled}
                        onFocus={this.openDropDown}
                        onBlur={this.closeDropDown}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeys}/>
                </div>

                <DropDownList items={this.state.filteredOptions ||this.state.options}
                    titleField={this.props.titleField}
                    query={this.state.value}
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
    updateStateIfPropsChanged: function(newProps){
        var propsForState = {};
        if (newProps.value){
            propsForState.value = newProps.value;
        }
        if (newProps.options){
            propsForState.options = newProps.options;
        }
        if (newProps.value || newProps.options){
            this.setState(newProps);
        }
    },
    closeDropdownAndBringFocusBack: function(){
        var supportedIntervalMethod = window.requestAnimationFrame ? window.requestAnimationFrame : window.setTimeout;

        supportedIntervalMethod.call(window, function(){
            this.refs.textInput.getDOMNode().focus();
            this.closeDropDown();
        }.bind(this));

    }
});