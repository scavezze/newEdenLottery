Router.configure({
    layoutTemplate: 'layout'
    //loadingTemplate: 'loading'
});


Router.map(function() {
    this.route('home', {path: '/'});

    this.route('admin', {path: '/admin'});

    this.route('faqs', {path: '/faq'});
});