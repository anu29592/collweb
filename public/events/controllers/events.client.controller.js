angular.module('events').controller('EventsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Events',
	function($scope, $routeParams, $location, Authentication, Events) {
		$scope.authentication = Authentication;

		$scope.branch = {
			availableBranch: [	
				{id:1, name: "Electronics and Communication Engineering"},
				{id:2, name: "Computer Science Enginerring"},
				{id:3, name: "Mechanical Engineering"},
				{id:4, name: "Civil Engineering"},
				{id:5, name: "Information Science and Engineering"},
				{id:6, name: "Telecommunication Engineering"},
				{id:7, name: "Biotechnology Engineering"},
				{id:7, name: "All"},

			],
			selectedOption: {}
		};
		
		$scope.viewall = function(){
			showall= true;
			$scope.branch.selectedOption = {};
		};

		$scope.create = function() {
			var event = new Events({
				title: this.title,
				branch: $scope.branch.selectedOption.name,
				description: this.description
			});

			event.$save(function(response) {
				$location.path('events/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.events = Events.query();
		};

		$scope.findOne = function() {
			$scope.event = Events.get({
				eventId: $routeParams.eventId
			});
		};

		$scope.update = function() {
			$scope.event.$update(function() {
				$location.path('events/' + $scope.event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(event) {
			if (event) {
				event.$remove(function() {
					for (var i in $scope.events) {
						if ($scope.events[i] === event) {
							$scope.events.splice(i, 1);
						}
					}
				});
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};
	}
]);
