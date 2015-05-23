Meteor.publish("walletTransactions", function () {
    if(this.userId) {
        var loggedInUser = Meteor.users.findOne(this.userId);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return WalletTransactions.find();
        }
    }
});
