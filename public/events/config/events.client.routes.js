angular.module('events').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/events', {
            templateUrl: 'events/views/list-events.client.view.html',
			controller: 'validateSession'
        }).
        when('/events/create', {
            templateUrl: 'events/views/create-event.client.view.html',
			controller: 'validateSession'
        }).
        when('/events/:eventId', {
            templateUrl: 'events/views/view-event.client.view.html',
			controller: 'validateSession'
        }).
        when('/events/:eventId/edit', {
            templateUrl: 'events/views/edit-event.client.view.html',
			controller: 'validateSession'
        });
    }
]);

angular.module('events').controller('validateSession',['$scope','$location','Authentication',
	function($scope,$location,Authentication){
		var authentication = Authentication;
		
		if(authentication.user==null){
			$location.replace();
			$location.path('/index');
		}
	}
]);	
