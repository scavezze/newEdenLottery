/**
 * Created by nscavezze on 5/18/15.
 */
Template.faqs.helpers({
    faqs: function () {
        return Faqs.find({enabled: true},{sort: {createdAt: -1}})
    }
});