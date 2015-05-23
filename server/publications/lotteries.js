Meteor.publish("lotteries", function () {
    if(this.userId) {
        var loggedInUser = Meteor.users.findOne(this.userId);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return Lotteries.find();
        } else {
            return Lotteries.find({active: true});
        }
    } else {
        return Lotteries.find({active: true});
    }
});