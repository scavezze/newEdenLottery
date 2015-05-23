/**
 * Created by nscavezze on 5/18/15.
 */
Template.adminLottery.helpers({
    lotteries: function () {
        return Lotteries.find()
    }
});

Template.lotteryRow.helpers({
    formatAsIsk: function (value) {
        return accounting.formatMoney(value, { symbol: "ISK",  format: "%v %s" }).replace(".00", "");
    }
});

Template.lotteryRow.events({
    "click .delete": function () {
        var r = confirm("Are you sure you want to delete lottery item: " + this._id);
        if (r == true) {
            Meteor.call("deleteLottery", this._id);
        }
    }
});