(function(){
    let app = angular.module('istAuth', []);

    app.service('$auth', function($rootScope, $window){
        //This service contains several methods related to authentication for the app 
        var service = this;
    
        service.checkAuth = function() {
            var auth = JSON.parse($window.localStorage.getItem('auth'));
    
            if (auth && auth.token.length) {
                return true;
            } else {
                return false;
            }
        };
    
        service.loginFromSaved = function() {
            if (!service.checkAuth()) {
                return;
            }
    
            var auth = JSON.parse($window.localStorage.getItem('auth'));
            service.setLogin(auth);
        }
    
        service.login = function(username, password) {
            if (service.checkAuth()) {
                return;
            }
    
            $http({
                url: $rootScope.url + '/api/login',
                method: 'POST',
                params: {
                    'username': username,
                    'password': password
                }
            }).then(function(response){
                service.setLogin(response.data.user);
                $rootScope.closeModal('#modal-login');
                $('#username').val("");
                $('#password').val("");
            }, function(response){
                console.log('login faied');
                console.log(response);
            });
        };
    
        service.setLogin = function(user) {
            $rootScope.auth = user;
            $rootScope.token = user.token;
    
            $window.localStorage.setItem('auth', JSON.stringify(user));
        };
    
        service.logout = function() {
            $rootScope.auth = null;
            $rootScope.token = null;
            $window.localStorage.removeItem('auth');
        };
    });
})();