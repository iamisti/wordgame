(function(){
    'use strict';

    function HighScoreService($q){
        var service = this;

        service.addHighScore = addHighScore;
        service.getHighScore = getHighScore;

        function addHighScore(playerName, highscore){
            getHighScore().then(function(storedHighScores){
                highscore['playerName'] = playerName;

                storedHighScores.push(highscore);

                var orderedHighScores = orderHighScore(storedHighScores);

                orderedHighScores = _.slice(orderedHighScores, 0, 10);

                firebase.database().ref()
                    .child('/highscores')
                    .set(orderedHighScores);
            });
        }

        function getHighScore(){
            var deferred = $q.defer();

            firebase
                .database().ref('highscores').once('value').then(function (data) {
                    var orderedHighScores = orderHighScore(data.val());

                    deferred.resolve(orderedHighScores);
                });

            return deferred.promise;
        }

        function orderHighScore(highscores){
            return _.sortBy(highscores, function(aHighScore){
                return -aHighScore.score;
            });
        }
    }

    angular
        .module('wordGame.game')
        .service('HighScoreService', ['$q', HighScoreService]);
}());