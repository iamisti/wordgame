(function(){
    'use strict';

    function HighScoreService($q){
        var service = this;

        service.addHighScore = addHighScore;
        service.getHighScore = getHighScore;

        function addHighScore(highscore){
            getHighScore().then(function(storedHighScores){
                 console.log(Object.keys(storedHighScores));
            });

            firebase.database().ref()
                .child('/highscores')
                .push(highscore);
        }

        function getHighScore(){
            var deferred = $q.defer();

            firebase
                .database().ref('highscores').once('value').then(function (data) {
                    deferred.resolve(data.val());
                });

            return deferred.promise;
        }
    }

    angular
        .module('wordGame.game')
        .service('HighScoreService', ['$q', HighScoreService]);
}());