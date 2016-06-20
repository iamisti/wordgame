(function(){
    'use strict';

    function PlayerModelFactory(){
        return {
            getPlayer: getPlayer
        };

        function getPlayer(name){
            return new PlayerModel(name);
        }
    }

    function PlayerModel(name){
        this.playerName = name;
        this.playerScore = {};
    }

    PlayerModel.prototype.setScore = function(score){
        //TODO: since local highscores will have a sorting, it's not obvious which was the last added score. That's why we need lastAddedHighScore here, to be aware of it.
        this.playerScore = {
            'score': score,
            'date': new Date().getTime()
        };
    };

    PlayerModel.prototype.getScore = function(){
        return this.playerScore;
    };

    PlayerModel.prototype.getName = function(){
        return this.playerName;
    };

    angular
        .module('wordGame.common')
        .factory('PlayerModelFactory', PlayerModelFactory);
}());