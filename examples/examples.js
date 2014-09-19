
(function(document){

    document.addEventListener("DOMContentLoaded", function() {
        React.renderComponent(
            ReactComboBox.ComboBox({options: ["test", "test2"]}),
            document.getElementById('content')
        );
    });

})(window.document);
