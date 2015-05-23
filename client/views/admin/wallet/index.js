/**
 * Created by nscavezze on 5/18/15.
 */
Template.adminWallet.helpers({
    walletEntries: function () {
        return WalletTransactions.find({},{sort: {refID: -1}})
    }
});

Template.walletRow.helpers({
    boolString: function(value) {
        return (value) ? "True" : "False"
    },
    formatAsIsk: function (value) {
        return accounting.formatMoney(value, { symbol: "ISK",  format: "%v %s" }).replace(".00", "");
    },
    isNotProcessd: function() {
        return !this.processed;
    }
});

Template.walletRow.events({
    "click .delete": function () {
        var r = confirm("Are you sure you want to delete wallet item: " + this._id);
        if (r == true) {
            Meteor.call("deleteWallet", this._id);
        }
    },
    "click .processed": function () {
            Meteor.call("markProcessed", this._id);
    }
});