(function () {
    'use strict';

    var STATES = {
        LOGIN: 'login'
    };

    function statesConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state(STATES.LOGIN, {
            url: '/login',
            isAuthenticationRequired: false,
            views: {
                'main': {
                    templateUrl: '/login/views/login.html',
                    controller: 'LoginCtrl as vm'
                }
            }
        });

        $urlRouterProvider.otherwise('/login');
    }

    angular
        .module('wordGame.login')
        .constant('LOGIN_STATES', STATES)
        .config(['$stateProvider', '$urlRouterProvider', statesConfig]);
}());