/**
 * Created by nscavezze on 5/21/15.
 */
Lotteries = new Mongo.Collection("lotteries");
Lotteries.attachSchema(new SimpleSchema({
    active: {
        type: Boolean,
        label: "Active",
        defaultValue: true
    },
    description: {
        type: String,
        label: "Description"
    },
    identifier: {
        type: String,
        label: "Identifier",
        defaultValue: "reg"
    },
    endedAt: {
        type: Date,
        label: "Ended At",
        optional: true,
        defaultValue: new Date(1900, 1, 1, 12, 0, 0,0),
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        }
    },
    cap: {
        type: Number,
        label: "Cap",
        defaultValue: 0
    },
    sum: {
        type: Number,
        label: "Sum",
        defaultValue: 0
    },
    profit: {
        type: Number,
        label: "Profit",
        defaultValue: 0
    },
    ticketCost: {
        type: Number,
        label: "Ticket Cost",
        defaultValue: 0
    },
    nextAvailTicket: {
        type: Number,
        label: "Next Available Ticket",
        defaultValue: 1
    },
    createdAt: {
        type: Date,
        label: "Created At",
        optional: true,
        defaultValue: new Date()
    }
}));
Lotteries.getNewLottery = function(cap, cost, ident) {
    return {
        active: true,
        cap: cap,
        description: "Lottery #" + Lotteries.find().fetch().length,
        sum: 0,
        profit: 0,
        ticketCost: cost,
        identifier: ident
    }
};

Meteor.methods({
    addLottery: function (lottery) {
        // Make sure the user is logged in before inserting a task
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(lottery, Lotteries.simpleSchema())

        Lotteries.insert({
            active: lottery.active,
            description: lottery.description,
            identifier: lottery.identifier,
            endedAt: lottery.endedAt,
            cap: lottery.cap,
            sum: lottery.sum,
            profit: lottery.profit,
            ticketCost: lottery.ticketCost,
            nextAvailTicket: lottery.nextAvailTicket,
            createdAt: new Date()
        });
    },
    updateLottery: function (newLottery, id) {
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(newLottery, Lotteries.simpleSchema())

        Lotteries.update(id, newLottery);
    },
    deleteLottery: function (lotteryId) {
        Lotteries.remove(lotteryId);
    }
});