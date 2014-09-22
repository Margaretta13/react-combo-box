React-combo-box is [ReactJS](http://facebook.github.io/react/) based implementation of [Combo box](http://en.wikipedia.org/wiki/Combo_box) 
=======================================================================


##Dependencies:
- [React with addons](http://fb.me/react-with-addons-0.11.2.js)

##Examples:
- [examples plunker](http://plnkr.co/edit/CpOhd7?p=preview)
- [examples plunker with Bootstrap 3](http://plnkr.co/edit/PLBfy8?p=preview)

## Features

- Configurable options source
- Customizable drop down item
- Full keyboard navigation support
- AMD, CommonJS and globals module system support
- Small code base: 300 lines of JavaScript and just 6 KB for combobox.min.js

## Browser compatibility

Starting from Internet Explorer 10.

## Installation using [Bower](http://bower.io/)


- `bower install react-combo-box`
- Inside your HTML add (if you not using module systems)
  - combobox.min.js: `<script src="bower_components/react-combo-box/dist/js/combobox.min.js"></script>`
  - combobox.css: `<link rel="stylesheet" href="bower_components/react-combo-box/dist/css/combobox.css">`

## Basic usage
```javascript
var stringOptions = ["one", "two", "three"];
      
var combobox = React.renderComponent(
    ReactComboBox({options: stringOptions, defaultValue: "two"}),
    document.getElementById('whereToPlace')
);
```

## Component properties

  * **options=[]** _{string[]}_ or _{object[]}_  - Array of options
      If array of objects provided, you have to specify titleField property
  * **defaultValue=""** _{string}_ - that value will be showed after initialization. After initialization use setValue method to change it
  * **source** _{function(query)}_ - if provided, options not needed. This function will be called on initializing and after every input change
  * **titleField** _{string}_ - should be provided, if options is array of objects
  * **onChange** _{function(value, selectedItem)}_ - this function called on every change   
  * **onItemSelected** _{function(selectedItem)}_ - this function called on selecting item by click or key pressing 
  * **cutomItem** _{ReactJS class}_ - custom item present component, also can be passed as child of ComboBox
  * **disabled=false** _{boolean}_ - combobox may be disabled
  * **customInputClass** _{string}_ - you can specify CSS class for input. Useful with bootstrap to specify "form-control", as in [example](http://plnkr.co/edit/PLBfy8?p=preview)

## Development
### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp`
* Install local dev dependencies: `npm install` in repository directory
* Bulid sources with: `gulp sources`
* Bulid styles with: `gulp styles`
* Run tests with: `gulp test`

### Development Commands

* `gulp` to jshint, build and test
* `gulp sources` to build sources
* `gulp styles` to build styles
* `gulp lint` to jshint
* `gulp test` for one-time test with karma
* `gulp watch` to watch src files to build

## Contributing

- Run the tests
- Try the [examples](https://github.com/angular-ui/ui-select/blob/master/examples)