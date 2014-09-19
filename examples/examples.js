
(function(document){
    "use strict";

    var stringOptions = ["test1", "test2", "test3", "test4", "test6"];

    document.addEventListener("DOMContentLoaded", function() {

        React.renderComponent(
            ReactComboBox.ComboBox({options: stringOptions}),
            document.getElementById('content')
        );

        var MyCustomItem = React.createClass({displayName: 'MyCustomItem',
            render: function () {
                return (
                    React.DOM.div({className: "myBest"},
                        React.DOM.i(null, this.props.title)
                    )
                );
            }
        });

        React.renderComponent(
            ReactComboBox.ComboBox({options: stringOptions}, MyCustomItem(null)),
            document.getElementById('custom')
        );

    });

})(window.document);
