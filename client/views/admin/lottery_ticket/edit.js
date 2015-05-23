AutoForm.hooks({
    updateLotteryTicket: {
        onSuccess: function(formType, result) {
            Router.go('adminLotteryTicket');
        }
    }
});