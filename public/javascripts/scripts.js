$(document).ready(function() {
    $('a.delete-basket').click(function (event) {
        event.stopPropagation();
        event.preventDefault();

        $(this).parents('form:first').submit();
    });

    $('a.delete-product').click(function (event) {
        event.stopPropagation();
        event.preventDefault();

        $(this).parents('form:first').submit();
    });
});