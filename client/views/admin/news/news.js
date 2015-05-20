/**
 * Created by nscavezze on 5/18/15.
 */
Template.adminNews.helpers({
    news: function () {
        return News.find()
    }
});

Template.newsRow.helpers({
    truncateBody: function (){
        if (this.body.length > 90)
            return this.body.substring(0,90)+'...';
        else
            return this.body;
    }
});

Template.newsRow.events({
    "click .delete": function () {
        var r = confirm("Are you sure you want to delete news item: " + this._id);
        if (r == true) {
            Meteor.call("deleteNews", this._id);
        }
    }
});