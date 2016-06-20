(function(){
    'use strict';

    function HighScoreService(){
        var service = this;
        var highScores = {
            values: []
        };

        service.addHighScore = addHighScore;
        service.getHighScore = getHighScore;
        service.init = init;

        function init(){
            setHighScoreListener();
        }

        function addHighScore(playerName, highscore){
            highscore['playerName'] = playerName;

            highScores.values.push(highscore);

            var orderedHighScores = orderHighScore(highScores.values);
            orderedHighScores = _.slice(orderedHighScores, 0, 10);

            firebase.database().ref()
                .child('/highscores')
                .set(orderedHighScores);

            highScores.values = orderedHighScores;
        }

        function getHighScore(){
            return highScores;
        }

        function setHighScoreListener(){
            firebase.database().ref('highscores').on('value',function (data) {
                highScores.values = _.values(data.val());
            });
        }

        function orderHighScore(highscores){
            return _.sortBy(highscores, function(aHighScore){
                return -aHighScore.score;
            });
        }
    }

    angular
        .module('wordGame.game')
        .service('HighScoreService', [HighScoreService]);
}());