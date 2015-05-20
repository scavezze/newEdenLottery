AutoForm.hooks({
    newNewsPost: {
        onSuccess: function(formType, result) {
            Router.go('adminNews');
        }
    }
});