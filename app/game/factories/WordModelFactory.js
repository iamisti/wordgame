(function(){
    'use strict';

    function WordModelFactory(){
        return {
            getWord: getWord
        };

        function getWord(name){
            return new WordModel(name);
        }
    }

    function WordModel(name){
        this.wordName = name;
    }

    WordModel.prototype.getMangledWord = function(){
        var a = this.wordName.split(""),
            n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        
        return a.join("");  
    };


    WordModel.prototype.getWord = function(){
        return this.wordName;
    };
    
    WordModel.prototype.getWordScore = function(mistakes){
        var maximumScore = Math.floor(Math.pow(1.95, (this.wordName.length/3) ));

        var currentScore = maximumScore - mistakes;

        return currentScore >= 0 ? currentScore : 0;
    };

    angular
        .module('wordGame.game')
        .factory('WordModelFactory', WordModelFactory);
}());