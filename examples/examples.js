
(function(document){

    var stringOptions = ["test1", "test2", "test3", "test4", "test6"];

    document.addEventListener("DOMContentLoaded", function() {

        React.renderComponent(
            ReactComboBox.ComboBox({options: stringOptions}),
            document.getElementById('content')
        );

    });

})(window.document);
