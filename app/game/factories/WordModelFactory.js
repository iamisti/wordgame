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
        var splittedWord = this.wordName.split("");

        splittedWord = _.shuffle(splittedWord);

        //In case we end up with the same word.
        if(splittedWord === this.wordName){
            return this.getMangledWord();
        }

        return splittedWord.join("");
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