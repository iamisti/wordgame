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
        this.highscores = highscores || [];
        this.lastAddedHighScore;
        this.isSaved = false;
    }

    PlayerModel.prototype.addScore = function(score){
        //TODO: since local highscores will have a sorting, it's not obvious which was the last added score. That's why we need lastAddedHighScore here, to be aware of it.
        this.lastAddedHighScore = {
            'score': score,
            'date': new Date().getTime()
        };
        
        this.highscores.push(this.lastAddedHighScore);
    };

    PlayerModel.prototype.getLastHighScore = function(){
        return this.lastAddedHighScore;
    };

    PlayerModel.prototype.getName = function(){
        return this.playerName;
    };

    PlayerModel.prototype.isSaved = function(){
        return this.isSaved;
    };

    PlayerModel.prototype.setSaved = function(isSaved){
        this.isSaved = isSaved ? true : false;
    };

    PlayerModel.prototype.setId = function(id){
        this.id = id;
    };

    PlayerModel.prototype.getId = function(){
        return this.id;
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