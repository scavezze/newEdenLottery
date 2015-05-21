updateWallet = function(task, done) {
    console.log("update wallet Started");
    var response = Async.runSync(function(finished) {
        eveonlinejs.fetch('corp:WalletJournal', function (err, result) {
            finished(err, result);
        });
    });

    if (response.error) throw response.error

    for (var entry in response.result.entries) {
        console.log(response.result.entries[entry])
    }

    Cue.addTask('updateWallet', {isAsync:false, unique:false, delay: WALLET_UPDATE_DELAY}, {});
    console.log("update wallet Done");
    done();
}