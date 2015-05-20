AutoForm.hooks({
    newFaqsPost: {
        onSuccess: function(formType, result) {
            Router.go('adminFaqs');
        }
    }
});