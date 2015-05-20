AutoForm.hooks({
    updateFaqsPost: {
        onSuccess: function(formType, result) {
            Router.go('adminFaqs');
        }
    }
});