/**
 * Created by nscavezze on 5/18/15.
 */
Template.adminFaqs.helpers({
    faqs: function () {
        return Faqs.find()
    }
});

Template.faqsRow.helpers({
    truncateAnswer: function (){
        if (this.answer.length > 90)
            return this.answer.substring(0,90)+'...';
        else
            return this.answer;
    }
});

Template.faqsRow.events({
    "click .delete": function () {
        var r = confirm("Are you sure you want to delete faqs item: " + this._id);
        if (r == true) {
            Meteor.call("deleteFaqs", this._id);
        }
    }
});