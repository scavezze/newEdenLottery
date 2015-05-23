AutoForm.hooks({
    updateWallet: {
        onSuccess: function(formType, result) {
            Router.go('adminWallet');
        }
    }
});