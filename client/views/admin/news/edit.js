AutoForm.hooks({
    updateNewsPost: {
        onSuccess: function(formType, result) {
            Router.go('adminNews');
        }
    }
});