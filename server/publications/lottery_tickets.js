Meteor.publish("lotteryTickets", function () {
    if(this.userId) {
        var loggedInUser = Meteor.users.findOne(this.userId);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return LotteryTickets.find();
        }
    }
});

Meteor.publish('topFiveWInners', function() {
    Meteor.publishWithRelations({
        handle: this,
        collection: LotteryTickets,
        filter: { winner: true },
        options: {
            limit: 5,
            sort: { createdAt: -1 }
        },
        mappings: [{
            key: 'lotteryID',
            collection: Lotteries
        }]
    });
});
