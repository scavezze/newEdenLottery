Meteor.startup(function () {
    WALLET_UPDATE_DELAY = 60000
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

    eveonlinejs = Meteor.npmRequire('eveonlinejs');
    eveonlinejs.setParams({
        keyID: '1865894',
        vCode: '4vD9oIUSzMOHOiqfwavbNFcVpdpV93MzKefdeWujuZJKZ5dQEr0GU1ohTMOsFf9S'
    });

    Cue.start()

    //Define jobs
    Cue.addJob('updateWallet', {retryOnError:true, maxMs:60000, maxAtOnce:1}, updateWallet);

    //Seed task on startup
    Cue.addTask('updateWallet', {isAsync:false, unique:false, delay:WALLET_UPDATE_DELAY}, {});
});