Template.home.helpers({
    news: function () {
        return News.find({enabled: true},{limit: 5, sort: {createdAt: -1}})
    },
    lotteries: function(){
        return Lotteries.find({active: true});
    },
    winners: function(){
        return LotteryTickets.find({winner: true}, {sort: {createdAt: -1}, limit: 5});
    }
});