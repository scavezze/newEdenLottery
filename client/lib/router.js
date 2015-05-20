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
            return Meteor.subscribe('news');
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

});