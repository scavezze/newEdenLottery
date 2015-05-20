Meteor.publish("news", function () {
    //Meteor._sleepForMs(2000);
    return News.find();
});