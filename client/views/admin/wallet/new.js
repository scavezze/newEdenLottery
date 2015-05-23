AutoForm.hooks({
    newWalletEntry: {
        onSuccess: function(formType, result) {
            Router.go('adminWallet');
        }
    }
});