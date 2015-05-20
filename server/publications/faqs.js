/**
 * Created by nscavezze on 5/20/15.
 */

Meteor.publish("faqs", function () {
    if(this.userId) {
        var loggedInUser = Meteor.users.findOne(this.userId);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return Faqs.find();
        } else {
            return Faqs.find({enabled: true});
        }
    } else {
        return Faqs.find({enabled: true});
    }
});
