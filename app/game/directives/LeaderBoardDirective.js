(function () {
    'use strict';

    function LeaderBoardDirective(HighScoreService) {

        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'game/views/leaderboardDirectiveView.html',
            link: function($scope){
                $scope.highscores = [];

                HighScoreService.getHighScore().then(function(highscores){
                    $scope.highscores = highscores;
                });
            }
        };
    }

    angular
        .module('wordGame.game')
        .directive('gamewordLeaderboard', ['HighScoreService', LeaderBoardDirective]);
})();