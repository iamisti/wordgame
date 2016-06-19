(function(){
    'use strict';

    function PlayerModelFactory(){
        return {
            getPlayer: getPlayer
        };

        function getPlayer(name, highscore){
            return new PlayerModel(name, highscore);
        }
    }

    function PlayerModel(name, highscores){
        this.playerName = name;
        this.highscores = highscores | [];
        this.isSaved = false;
    }

    PlayerModel.prototype.addScore = function(score, date){
          this.highscores.push({
              'score': score,
              'date': date
          });
    };

    PlayerModel.prototype.isSaved = function(){
        return this.isSaved;
    };

    PlayerModel.prototype.setSaved = function(isSaved){
        this.isSaved = isSaved ? true : false;
    };

    PlayerModel.prototype.toDto = function(){
        
        //TODO: sort highscore list and provide only the top 10 results.
        return {
            'name': this.playerName,
            'highscores': this.highscores
        }
    };
    
    

    angular
        .module('wordGame.common')
        .factory('PlayerModelFactory', PlayerModelFactory);
}());