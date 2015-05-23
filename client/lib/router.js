Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.onBeforeAction(function () {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                Router.go('home');
            } else {
                this.next();
            }
        }
        else{
            Router.go('home');
        }
    } else {
        if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
            Router.go('home');
        } else {
            this.next();
        }
    }
}, {
    except: ['home', 'faqs']
});

Router.map(function() {
    this.route('home', {
        path: '/',
        waitOn: function () {
            return [Meteor.subscribe('news'),
                    Meteor.subscribe('lotteries'),
                    Meteor.subscribe('topFiveWInners')];
        }
    });

    this.route('faqs', {
        path: '/faq',
        waitOn: function () {
            return Meteor.subscribe('faqs');
        }
    });

    //Admin section
    //NEWS =========================================
    this.route('adminNews', {
        path: '/admin/news',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('news');
        }
    });
    this.route('adminNewsNew', {path: '/admin/news/new', layoutTemplate: 'admin'});
    this.route('adminNewsEdit', {
        path: '/admin/news/edit/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('news');
        },
        data: function(){
            var id = this.params.id;
            return {newPost: News.findOne({_id: id})};
        }
    });
    this.route('adminNewsShow', {
        path: '/admin/news/show/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('news');
        },
        data: function(){
            var id = this.params.id;
            return News.findOne({_id: id});
        }
    });

    //FAQS =========================================
    this.route('adminFaqs', {
        path: '/admin/faqs',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('faqs');
        }
    });
    this.route('adminFaqsNew', {path: '/admin/faqs/new', layoutTemplate: 'admin'});
    this.route('adminFaqsEdit', {
        path: '/admin/faqs/edit/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('faqs');
        },
        data: function(){
            var id = this.params.id;
            return {newPost: Faqs.findOne({_id: id})};
        }
    });
    this.route('adminFaqsShow', {
        path: '/admin/faqs/show/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('faqs');
        },
        data: function(){
            var id = this.params.id;
            return Faqs.findOne({_id: id});
        }
    });

    //Wallet =========================================
    this.route('adminWallet', {
        path: '/admin/wallet',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('walletTransactions');
        }
    });
    this.route('adminWalletNew', {path: '/admin/wallet/new', layoutTemplate: 'admin'});
    this.route('adminWalletEdit', {
        path: '/admin/wallet/edit/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('walletTransactions');
        },
        data: function(){
            var id = this.params.id;
            return {walletEntry: WalletTransactions.findOne({_id: id})};
        }
    });
    this.route('adminWalletShow', {
        path: '/admin/wallet/show/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('walletTransactions');
        },
        data: function(){
            var id = this.params.id;
            return WalletTransactions.findOne({_id: id});
        }
    });

    //Lotteries =========================================
    this.route('adminLottery', {
        path: '/admin/lottery',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('lotteries');
        }
    });
    this.route('adminLotteryNew', {path: '/admin/lottery/new', layoutTemplate: 'admin'});
    this.route('adminLotteryEdit', {
        path: '/admin/lottery/edit/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('lotteries');
        },
        data: function(){
            var id = this.params.id;
            return {lottery: Lotteries.findOne({_id: id})};
        }
    });
    this.route('adminLotteryShow', {
        path: '/admin/lottery/show/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('lotteries');
        },
        data: function(){
            var id = this.params.id;
            return Lotteries.findOne({_id: id});
        }
    });

    //Lottery Tickets =========================================
    this.route('adminLotteryTicket', {
        path: '/admin/lottery_ticket',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('lotteryTickets');
        }
    });
    this.route('adminLotteryTicketNew', {path: '/admin/lottery_ticket/new', layoutTemplate: 'admin'});
    this.route('adminLotteryTicketEdit', {
        path: '/admin/lottery_ticket/edit/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('lotteryTickets');
        },
        data: function(){
            var id = this.params.id;
            return {lotteryTicket: LotteryTickets.findOne({_id: id})};
        }
    });
    this.route('adminLotteryTicketShow', {
        path: '/admin/lottery_ticket/show/:id',
        layoutTemplate: 'admin',
        waitOn: function () {
            // return one handle, a function, or an array
            return Meteor.subscribe('lotteryTickets');
        },
        data: function(){
            var id = this.params.id;
            return LotteryTickets.findOne({_id: id});
        }
    });

    //JOBS ==============================================================
    this.route('adminJobs', {
        path: '/admin/jobs',
        layoutTemplate: 'admin'
    });
});