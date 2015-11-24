/**
 * Created by anusha on 11/18/2015.
 */
var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
    $scope.name = 'World';

    $scope.myusers=[{username:'user1',password:'12323'},
        {username:'user2',password:'12323'}];
    $scope.submit=function()
    {
        if($scope.username && $scope.password)
        {
            var user=$scope.username;
            var pass=$scope.password;
            alert("welcome"+"\n"+ user);

            $scope.myusers.push({username:user,password:pass});
        }else{
            alert("Invalid Login");
        }
    }
});