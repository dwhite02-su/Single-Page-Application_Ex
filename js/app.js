(function () {
    //API Key
    var token = 'zl6q9Dnlpp8AXAbsSeXi2iBEWmTLGRhLVOMhFlNX';


    //Create a module
    let app = angular.module('app', ['ui.router', 'istAuth']);


    //Config Block
    app.config(function ($stateProvider, $urlRouterProvider) {
        //Configure the routes for the application
        $stateProvider
            .state('index', {
                url: '/home',
                templateUrl: '/templates/index.html',
                controller: 'indexCtrl'
            })

        $stateProvider
            .state('feed', {
                url: '/feed',
                templateUrl: '/templates/feed.html',
                controller: 'feedCtrl'
            })

        $stateProvider
            .state('upload', {
                url: '/upload',
                templateUrl: '/templates/upload.html',
                controller: 'uploadCtrl'
            })

        $stateProvider
            .state('profile', {
                url: '/profile/',
                templateUrl: '/templates/profile.html',
                controller: 'profileCtrl'
            })
        //If the user requests a URL that isn't mapped to a route, redirect them to the homepage
        $urlRouterProvider.otherwise('index');
    });


    //Run Block
    app.run(function ($rootScope, $auth, $state) {
        //Globally available functions to toggle Bootstrap modals
        $rootScope.openModal = function (selector) {
            $(selector).modal('show');
        };

        $rootScope.closeModal = function (selector) {
            $(selector).modal('hide');
        };


        //Check to see if the user is already logged in. If not, redirect to the homepage
        var isLoggedIn = $auth.checkAuth();
        if (!isLoggedIn) {
            $state.go('index');
        }
        //If user is already logged in, set the $rootScope.user and $rootScope.token objects
        $auth.loginFromSaved();
    });


    //Controllers
    app.controller('indexCtrl', function () {
        //Controller logic here
    });

    app.controller('mainHeaderCtrl', function ($scope, $auth, $rootScope) {
        $scope.credentials = {
            username: null,
            password: null
        }

        $scope.login = function () {
            console.log($scope.credentials)

            $auth.login($scope.credentials.username, $scope.credentials.password, function () {
                console.log($rootScope)
                $rootScope.closeModal('#modal-login')
            })
        }
    })

    app.controller('feedCtrl', function () {
       $.ajax({
           method: 'GET',
           url: 'https://ist363api.azurewebsites.net/api/media',
           data: {
               "token": token,
               "count": "12",
               "page": "1"
           },
           success: function (response) {
               console.log(response);
               $.each(response.data, function (index, image) {
                   $('.gram-pics .pic-list').append("<li class='flex-shrink-1 mb-3 col-xs-12 col-sm-6 col-md-6 col-lg-4'><img class=' ' src='https://ist363api.azurewebsites.net/" + image.image + "'></li>")
                });
           },
           error: function (response) {
               console.log(response);
               
           }
       })
    });
   

    app.controller('uploadCtrl', function () {
        //Controller logic here
    });

    app.controller('profileCtrl', function () {
        //Controller logic here
    });

    app.controller('footerCtrl', function () {
        //Controller logic here
    });



    //Components
    app.component('mainHeader', {
        templateUrl: '/templates/main-header.html',
        controller: 'mainHeaderCtrl'

    })

    app.component('footer', {
        templateUrl: '/templates/footer.html',
        controller: 'footerCtrl'

    })
    

})();