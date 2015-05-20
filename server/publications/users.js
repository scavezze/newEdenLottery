/**
 * Created by nscavezze on 5/19/15.
 */
Meteor.publish(null, function () {
    if(this.userId) {
        var loggedInUser = Meteor.users.findOne(this.userId);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return Meteor.users.find();
        } else {
            this.ready();
        }
    }
});
