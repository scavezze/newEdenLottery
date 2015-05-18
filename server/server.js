Meteor.startup(function () {

    ////////////////////////////////////////////////////////////////////
    // Create Admin Users
    //

    if (Meteor.users.find().fetch().length === 0) {

        console.log('Creating users: ');

        var users = [
            {name:"Admin User",email:"nate.scavezze@gmail.com",roles:['admin']}
        ];

        _.each(users, function (userData) {
            var id;

            console.log(userData);

            id = Accounts.createUser({
                email: userData.email,
                password: "Goldsta12",
                profile: { name: userData.name }
            });

            // email verification
            Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

            Roles.addUsersToRoles(id, userData.roles);

        });
    }



    ////////////////////////////////////////////////////////////////////
    // Prevent non-authorized users from creating new users
    //

    Accounts.validateNewUser(function (user) {
        var loggedInUser = Meteor.user();

        if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
            return true;
        }

        throw new Meteor.Error(403, "Not authorized to create new users");
    });

});