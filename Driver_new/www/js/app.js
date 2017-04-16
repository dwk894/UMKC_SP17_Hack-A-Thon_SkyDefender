// Git
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js

angular.module('app', ['ionic', 'app.controllers', 'ngCordova', 'chart.js', 'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router

        $stateProvider
            .state('splash', {
                url: '/',
                controller: 'LoginCtrl',
                templateUrl: 'templates/splash.html'
            })

            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'templates/home.html'
            })

            .state('home.map', {
                url: '/map',
                views: {
                    menuContent: {
                        controller: 'mapCtrl',
                        templateUrl: 'templates/map.html'
                    }
                }
            })

	    	.state('home.logout', {
                url: '/logout',
                views: {
                    menuContent: {
                        controller: 'logoutCtrl',
                        templateUrl: 'templates/logout.html'
                    }
                }
            })
            .state('home.wastepoints', {
                url: '/wastepoints',
                views: {
                    menuContent: {
                        controller: 'wastepointsCtrl',
                        templateUrl: 'templates/wastepoints.html'
                    }
                }
            })

            .state('home.chat', {
                url: '/chat',
                views: {
                    menuContent: {
                        controller: 'chatCtrl',
                        templateUrl: 'templates/chat.html'
                    }
                }
            });

        // If none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    })
    
    // Added by Tarun (to disable the back button after login)
    .run(function($ionicPlatform, $state){
        $ionicPlatform.registerBackButtonAction(function (event) {
            if ( $state.$current.name=="home") {
                // H/W BACK button is disabled for these states (these views)
                // Do not go to the previous state (or view) for these states. 
                // Do nothing here to disable H/W back button.
            } else {
                // For all other states, the H/W BACK button is enabled
                navigator.app.backHistory();
            }
        }, 100);
    })


    .directive('validated', function ($parse) {
        return {
            restrict: 'AEC',
            require: '^form',
            link: function (scope, element, attrs, form) {
                var inputs = element.find("*");

                for (var i = 0; i < inputs.length; i++) {
                    (function (input) {
                        var attributes = input.attributes;

                        if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
                            var field = form[attributes.name.value];

                            if (field != void 0) {
                                scope.$watch(function () {
                                    return form.$submitted + "_" + field.$valid;
                                }, function () {
                                    if (form.$submitted != true) return;

                                    var inp = angular.element(input);

                                    if (inp.hasClass('ng-invalid')) {
                                        element.removeClass('has-success');
                                        element.addClass('has-error');
                                    } else {
                                        element.removeClass('has-error').addClass('has-success');
                                    }
                                });
                            }
                        }
                    })(inputs[i]);
                }
            }
        }
    });