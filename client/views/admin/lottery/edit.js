AutoForm.hooks({
    updateLottery: {
        onSuccess: function(formType, result) {
            Router.go('adminLottery');
        }
    }
});