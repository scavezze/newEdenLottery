Template.winner.helpers({
    getWinnings: function(lotteryID){
        var lottery = Lotteries.findOne({_id: lotteryID});
        return accounting.formatMoney(lottery.sum, { symbol: "ISK",  format: "%v %s" }).replace(".00", "");
    }
});