AutoForm.hooks({
    newLotteryTicket: {
        onSuccess: function(formType, result) {
            Router.go('adminLotteryTicket');
        }
    }
});