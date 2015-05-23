/**
 * Created by nscavezze on 5/18/15.
 */
Template.adminLotteryTicket.helpers({
    lotteryTickets: function () {
        return LotteryTickets.find({},{sort: {winner: -1}})
    }
});

Template.lotteryTicketRow.helpers({
    boolString: function(value) {
        return (value) ? "True" : "False"
    },
    isUnPaidWinner: function() {
        return (this.winner && !this.paid);
    }
});

Template.lotteryTicketRow.events({
    "click .delete": function () {
        var r = confirm("Are you sure you want to delete lotteryTicket item: " + this._id);
        if (r == true) {
            Meteor.call("deleteLotteryTicket", this._id);
        }
    },
    "click .paid": function () {
            Meteor.call("lotteryTicketPaid", this._id);
    }
});