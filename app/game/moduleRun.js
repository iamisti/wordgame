(function () {
    'use strict';

    function initializeServices(HighScoreService) {
        HighScoreService.init();
    }

    angular
        .module('wordGame.game')
        .run(['HighScoreService', initializeServices]);
}());