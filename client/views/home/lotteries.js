/**
 * Created by nscavezze on 5/22/15.
 */
Template.lottery.helpers({
    formatAsIsk: function (value) {
        return accounting.formatMoney(value, { symbol: "ISK",  format: "%v %s" }).replace(".00", "");
    }
});