Meteor.startup(function () {

    ////////////////////////////////////////////////////////////////////
    // Create Admin Users
    //

    if (Meteor.users.find().fetch().length === 0) {

        console.log('Creating users: ');

        var users = [
            {name:"Admin User",username:"admin",roles:['admin']}
        ];

        _.each(users, function (userData) {
            var id;

            console.log(userData);

            id = Accounts.createUser({
                username: userData.username,
                password: "Goldsta12",
                profile: { name: userData.name }
            });

            // email verification
            Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

            Roles.addUsersToRoles(id, userData.roles);

        });
    }

    Queue.changeMainInterval(15000); /*changes queue processing interval to 15sec (default 5 sec)*/

    /* set maintenance tasks */
    Queue.setInterval('purgeLocks', 'Queue.purgeOldLocks', 60000); /* once a minute */
    Queue.setInterval('purgeCompleted', 'Queue.purgeCompletedTasks()', 86400000); /* once a day */
    Queue.setInterval('purgeLogs','Queue.purgeLogs()', 86400000); /* once a day */

});