/**
 * Created by nscavezze on 5/21/15.
 */
LotteryTickets = new Mongo.Collection("lotteryTickets");
LotteryTickets.attachSchema(new SimpleSchema({
    paid: {
        type: Boolean,
        label: "Paid",
        defaultValue: false
    },
    winner: {
        type: Boolean,
        label: "Winner",
        defaultValue: false
    },
    characterName: {
        type: String,
        label: "Character Name"
    },
    lotteryID: {
        type: String,
        label: "Lottery ID",
        optional: true
    },
    startRange: {
        type: Number,
        label: "Start Range",
        defaultValue: 1
    },
    endRange: {
        type: Number,
        label: "End Range",
        defaultValue: 1
    },
    createdAt: {
        type: Date,
        label: "Created At",
        defaultValue: new Date(),
        optional: true
    }
}));

LotteryTickets.getWinner = function(id, winner) {
    return LotteryTickets.findOne({
        lotteryID: id,
        startRange: {$lte: winner},
        endRange: {$gte: winner}
    });
};

Meteor.methods({
    addLotteryTicket: function (lotteryTicket) {
        // Make sure the user is logged in before inserting a task
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(lotteryTicket, LotteryTickets.simpleSchema())

        LotteryTickets.insert({
            winner: lotteryTicket.winner,
            characterName: lotteryTicket.characterName,
            lotteryID: lotteryTicket.lotteryID,
            startRange: lotteryTicket.startRange,
            endRange: lotteryTicket.endRange,
            createdAt: new Date()
        });
    },
    updateLotteryTicket: function (newLotteryTicket, id) {
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(newLotteryTicket, LotteryTickets.simpleSchema())

        LotteryTickets.update(id, newLotteryTicket);
    },
    deleteLotteryTicket: function (lotteryTicketsId) {
        LotteryTickets.remove(lotteryTicketsId);
    },
    lotteryTicketPaid: function (lotteryTicketsId) {
        LotteryTickets.update(lotteryTicketsId, {$set: {paid:true}});
    }
});