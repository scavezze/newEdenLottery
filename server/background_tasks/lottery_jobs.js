updateLotteries = function(task, done) {
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    console.log("Updating lotteries");
    var lotteries = Lotteries.find({active: true}).fetch();

    if (lotteries) {
        //Generate Tickets/Users
        for (var entry in lotteries) {
            var lottery = lotteries[entry];
            var walletTransactions = WalletTransactions.find({processed: false});

            if(walletTransactions) {
                walletTransactions = walletTransactions.fetch();

                for (var walletEntry in walletTransactions) {
                    var wt = walletTransactions[walletEntry];
                    if (wt.refTypeID === "10") {
                        if (wt.reason.replace("DESC: ", "").trim().toLowerCase() === lottery.identifier.toLowerCase()) {
                            var ticket = {
                                characterName: wt.ownerName1,
                                lotteryID: lottery._id,
                                startRange: lottery.nextAvailTicket,
                                endRange: Math.floor(lottery.nextAvailTicket + (wt.amount / lottery.ticketCost - 1)),
                                createdAt: new Date()
                            };
                            LotteryTickets.insert(ticket);

                            lottery.sum += Math.floor((wt.amount - (wt.amount * 0.15)));
                            lottery.profit += Math.floor((wt.amount * 0.15));
                            lottery.nextAvailTicket = ticket.endRange += 1;

                            WalletTransactions.update(wt._id, {$set: {processed: true}});
                        }
                    } else {
                        WalletTransactions.update(wt._id, {$set: {processed: true}});
                    }
                }

                //Check for winners
                if (lottery.sum >= lottery.cap) {
                    var highestTicketNumber = lottery.nextAvailTicket - 1;
                    var winner = randomIntFromInterval(1, highestTicketNumber);

                    var winningTicket = LotteryTickets.getWinner(lottery._id, winner);
                    winningTicket.winner = true;
                    LotteryTickets.update(winningTicket._id, {$set: winningTicket});

                    lottery.active = false;
                    lottery.endedAt = new Date();

                    var newLottery = Lotteries.getNewLottery(lottery.cap, lottery.ticketCost, lottery.identifier, lottery.description);
                    Lotteries.insert(newLottery);
                }
                Lotteries.update(lottery._id, {$set: lottery});
            }
        }
    }

    console.log("Done updating lotteries");
    done();
};