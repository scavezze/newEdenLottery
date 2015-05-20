Template.headerAdmin.helpers({
    isCurrentPage: function(pageNames){
        var names = pageNames.split("|");
        var name = Router.current().route.getName();
        for (i = 0; i < names.length; i++) {
           if(name === names[i]) {
               return true;
           }
        }
        return false;
    }
})