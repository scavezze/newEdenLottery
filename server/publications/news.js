Meteor.publish("news", function () {
    if(this.userId) {
        var loggedInUser = Meteor.users.findOne(this.userId);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return News.find();
        } else {
            return News.find({enabled: true});
        }
    } else {
        return News.find({enabled: true});
    }
});