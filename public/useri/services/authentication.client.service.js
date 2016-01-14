angular.module('useri').factory('Authentication', [
    function() {
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);
