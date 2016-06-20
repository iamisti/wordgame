(function () {
    'use strict';

    var STATES = {
        GAME: 'game'
    };

    function statesConfig($stateProvider) {
        $stateProvider.state(STATES.GAME, {
            url: '/game',
            isAuthenticationRequired: true,
            views: {
                'main': {
                    templateUrl: 'game/views/game.html',
                    controller: 'GameCtrl as vm'
                }
            }
        });
    }

    angular
        .module('wordGame.game')
        .constant('GAME_STATES', STATES)
        .config(['$stateProvider', statesConfig]);
}());