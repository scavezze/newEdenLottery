UpdateInfo = new Mongo.Collection("updateInfo");
UpdateInfo.attachSchema(new SimpleSchema({
    cached_until: {
        type: Number,
        label: "Cached Until",
        optional: true
    }
}));

WalletTransactions = new Mongo.Collection("walletTransactions");
WalletTransactions.attachSchema(new SimpleSchema({
    processed: {
        type: Boolean,
        label: "Processed",
        defaultValue: false
    },
    date: {
        type: String,
        label: "Date"
    },
    refID: {
        type: String,
        label: "Ref ID"
    },
    refTypeID: {
        type: String,
        label: "Ref Type ID",
        optional: true
    },
    ownerName1: {
        type: String,
        label: "Owner Name 1",
        optional: true
    },
    ownerID1: {
        type: String,
        label: "Owner ID 1",
        optional: true
    },
    ownerName2: {
        type: String,
        label: "Owner Name 2",
        optional: true
    },
    ownerID2: {
        type: String,
        label: "Owner ID 2",
        optional: true
    },
    argName1: {
        type: String,
        label: "Arg Name 1",
        optional: true
    },
    argID1: {
        type: String,
        label: "Arg ID 1",
        optional: true
    },
    amount: {
        type: String,
        label: "Amount"
    },
    balance: {
        type: String,
        label: "Balance"
    },
    reason: {
        type: String,
        label: "Reason",
        optional: true,
        defaultValue: "reg"
    },
    owner1TypeID: {
        type: String,
        label: "Owner 1 Type ID",
        optional: true
    },
    owner2TypeID: {
        type: String,
        label: "Owner 2 Type ID",
        optional: true
    }
}));

Meteor.methods({
    addWallet: function (wt) {
        // Make sure the user is logged in before inserting a task
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(wt, WalletTransactions.simpleSchema())

        var walletTransaction = {};
        walletTransaction.processed = false;
        walletTransaction.date = wt.date;
        walletTransaction.refID = wt.refID;
        walletTransaction.amount = wt.amount;
        walletTransaction.balance = wt.balance;
        walletTransaction.refTypeID = wt.refTypeID;
        walletTransaction.ownerID1 = wt.ownerID1;
        walletTransaction.owner1TypeID = wt.owner1TypeID;
        walletTransaction.ownerID2 = wt.ownerID2;
        walletTransaction.owner2TypeID = wt.owner2TypeID;
        walletTransaction.argID1 = wt.argID1;
        walletTransaction.ownerName1 = wt.ownerName1;
        walletTransaction.ownerName2 = wt.ownerName2;
        walletTransaction.argName1 = wt.argName1;
        walletTransaction.reason = wt.reason;

        WalletTransactions.insert(walletTransaction);
    },
    updateWallet: function (newWalletEntry, id) {
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(newWalletEntry, WalletTransactions.simpleSchema())

        WalletTransactions.update(id, newWalletEntry);
    },
    deleteWallet: function (walletEntryId) {
        WalletTransactions.remove(walletEntryId);
    },
    markProcessed: function (walletEntryId) {
        WalletTransactions.update(walletEntryId, {$set: {processed:true}});
    }
});