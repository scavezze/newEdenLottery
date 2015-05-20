Template.header.helpers({
    isCurrentPage: function(pageName){
        return Router.current().route.getName() == pageName
    }
})