updateWallet = function(task, done) {
    console.log("update wallet Started");
    var ROW_COUNT = 100;

    function getWalletResponse(fromId) {
        var options = {rowCount: ROW_COUNT};
        if(fromId) {
            options.fromID = fromId;
        }

        var response = Async.runSync(function (finished) {
            eveonlinejs.fetch('corp:WalletJournal', options, function (err, result) {

                if (err) {
                    var runJobs = new Date();
                    runJobs.setMinutes(runJobs.getMinutes() + 15);

                    Cue.addTask('updateWallet', {isAsync: false, unique: false, delayUntil: runJobs}, {});
                    done();

                    throw err;
                }

                var walletEntries = [];
                for (var entry in result.entries) {
                    walletEntries.push(result.entries[entry]);
                }

                result.entries = walletEntries.sort(function(a,b){b.refID - a.refID});

                finished(err, result);
            });
        });
        return response;
    }

    //Start=============================================================
    var update_info = UpdateInfo.findOne();

    if (!update_info || update_info.cached_until < new Date().getTime()) {
        var response = getWalletResponse(null);

        if (response.error) throw response.error;

        if(!update_info) {
            update_info = {};
            update_info.cached_until = Date.parse(response.result.cachedUntil);
            console.log("new update info");
            UpdateInfo.insert(update_info);
        } else {
            console.log("update update info");
            UpdateInfo.update(update_info._id, {$set: {cached_until: Date.parse(response.result.cachedUntil)}});
        }

        var id = "";
        while(response.result.entries.length  > 0) {
            console.log("updating Wallet");
            for (var entry in response.result.entries) {
                var wt = response.result.entries[entry];
                id = wt.refID;

                var walletTransaction = WalletTransactions.findOne({refID: wt.refID, date: wt.date});
                if(!walletTransaction) {
                    walletTransaction = {};
                    walletTransaction.processed = false;
                    walletTransaction.date = wt.date;
                    walletTransaction.refID = wt.refID;
                    walletTransaction.amount = wt.amount;
                    walletTransaction.balance = wt.balance;
                    walletTransaction.refTypeID = wt.refTypeID;
                    walletTransaction.ownerID1 = wt.ownerID1;
                    walletTransaction.owner1TypeID = wt.owner1TypeID;
                    walletTransaction.ownerID2 = wt.ownerID2;
                    walletTransaction.owner2TypeID = wt.owner2TypeID;
                    walletTransaction.argID1 = wt.argID1;
                    walletTransaction.ownerName1 = wt.ownerName1;
                    walletTransaction.ownerName2 = wt.ownerName2;
                    walletTransaction.argName1 = wt.argName1;
                    walletTransaction.reason = wt.reason;

                    console.log("insert Wallet Transaction");
                    WalletTransactions.insert(walletTransaction);
                }
            }

            response = getWalletResponse(id);
        }
        Cue.addTask('updateLotteries', {isAsync: false, unique: false}, {});
    }

    var runJobs = new Date();
    runJobs.setMinutes(runJobs.getMinutes() + 15);

    Cue.addTask('updateWallet', {isAsync: false, unique: false, delayUntil: runJobs}, {});
    console.log("update wallet Done");
    done();
};