/**
 * Created by nscavezze on 5/19/15.
 */
News = new Mongo.Collection("news");
News.attachSchema(new SimpleSchema({
    enabled: {
        type: Boolean,
        label: "Enabled",
        defaultValue: false
    },
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    body: {
        type: String,
        label: "Body",
        min: 20,
        autoform: {
            afFieldInput: {
                type: 'summernote',
                row: 5,
                class: 'editor' // optional
                ///settings: // summernote options goes here
            }
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        optional: true
    },
    user_id: {
        type: String,
        label: "Owner id",
        optional: true
    },
    username: {
        type: String,
        label: "Username",
        optional: true
    }
}));

Meteor.methods({
    addNews: function (news) {
        // Make sure the user is logged in before inserting a task
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(news, News.simpleSchema())

        News.insert({
            title: news.title,
            body: news.body,
            createdAt: new Date(),
            user_id: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    updateNews: function (newPost, id) {
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(newPost, News.simpleSchema())

        News.update(id, newPost);
    },
    deleteNews: function (newsId) {
        News.remove(newsId);
    }
});