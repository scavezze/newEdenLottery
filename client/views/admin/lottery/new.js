AutoForm.hooks({
    newLottery: {
        onSuccess: function(formType, result) {
            Router.go('adminLottery');
        }
    }
});