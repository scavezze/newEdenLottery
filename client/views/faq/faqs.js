/**
 * Created by nscavezze on 5/18/15.
 */
Template.faqs.helpers({
    faqs: function () {
        return Faqs.find({enabled: true},{sort: {createdAt: -1}})
    }
});

Template.faqsItemHeader.events({
    'click .question-jump-to':function(e,tmpl) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#question-" + tmpl.data._id).offset().top
        }, 600);
    }
});