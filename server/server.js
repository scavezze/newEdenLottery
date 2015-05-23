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

    if(Lotteries.find().fetch().length === 0) {
        var lottery = Lotteries.getNewLottery(10000000, 500000, "reg", "Small Lottery for Poor Pilots");
        Lotteries.insert(lottery);

        lottery = Lotteries.getNewLottery(100000000, 5000000, "big", "Big Money, High Roller");
        Lotteries.insert(lottery);
    }

    eveonlinejs = Meteor.npmRequire('eveonlinejs');
    eveonlinejs.setParams({
        keyID: '1865894',
        vCode: '4vD9oIUSzMOHOiqfwavbNFcVpdpV93MzKefdeWujuZJKZ5dQEr0GU1ohTMOsFf9S'
    });

    var runJobs = new Date();
    runJobs.setMinutes(runJobs.getMinutes() + 1);

    Cue.start()

    //Define jobs
    Cue.addJob('updateWallet', {retryOnError:true, maxMs:60000, maxAtOnce:1}, updateWallet);
    Cue.addJob('updateLotteries', {retryOnError:true, maxMs:60000, maxAtOnce:1}, updateLotteries);

    if(CueTasks.find().fetch().length === 0) {
        //Seed task on startup
        Cue.addTask('updateWallet', {isAsync: false, unique: false, delayUntil: runJobs}, {});
    }
});