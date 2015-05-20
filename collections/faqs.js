Faqs = new Mongo.Collection("faqs");
Faqs.attachSchema(new SimpleSchema({
    enabled: {
        type: Boolean,
        label: "Enabled",
        defaultValue: false
    },
    question: {
        type: String,
        label: "Question",
        max: 200
    },
    answer: {
        type: String,
        label: "Answer",
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
    addFaqs: function (faqs) {
        // Make sure the user is logged in before inserting a task
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(faqs, Faqs.simpleSchema())

        Faqs.insert({
            enabled: faqs.enabled,
            question: faqs.question,
            answer: faqs.answer,
            createdAt: new Date(),
            user_id: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    updateFaqs: function (newFaq, id) {
        var loggedInUser = Meteor.user();
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        check(newFaq, Faqs.simpleSchema())

        Faqs.update(id, newFaq);
    },
    deleteFaqs: function (faqId) {
        Faqs.remove(faqId);
    }
});