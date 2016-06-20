(function(){
    'use strict';

    function GameCtrl($scope, $interval, PlayerService, WordService, HighScoreService){
        var vm = this;
        var TIME_TO_PLAY_IN_SECONDS = 40;

        vm.getRandomWord = getRandomWord;
        vm.startGame = startGame;

        vm.player = PlayerService.getPlayer();

        startGame();

        $scope.$watch('vm.guessedWord', function(newGuess, oldGuess){
            if(!oldGuess || !newGuess){
                return;
            }

            if(vm.word.getWord() === vm.guessedWord){
                appendScoreAndGetNewWord();
                return;
            }

            var diff = oldGuess.length - newGuess.length;

            //TODO: valid word comparism would be required here,
            // since user can select multiple characters and delete it with one keypress
            // Revise diff mechanism logic later if there is a better way to check it.
            if(diff >= 0){
                vm.mistakes++;
            }
        });
        
        function appendScoreAndGetNewWord(){
            vm.currentPoints += vm.word.getWordScore(vm.mistakes);

            getRandomWord();
        }

        function startGame(){
            vm.isGameRunning = true;
            vm.guessedWord = '';
            vm.mistakes = 0;
            vm.currentPoints = 0;

            getRandomWord();

            vm.secondsRemained = TIME_TO_PLAY_IN_SECONDS;

            $interval(function(){
                vm.secondsRemained--;

                if(vm.secondsRemained == 0){
                    endGameAndStoreResults();
                }
            }, 1000, TIME_TO_PLAY_IN_SECONDS);
        }
        
        function endGameAndStoreResults(){
            vm.isGameRunning = false;

            vm.player.setScore(vm.currentPoints);

            HighScoreService.addHighScore(vm.player.getName(), vm.player.getScore());
        }

        function getRandomWord(){
            vm.guessedWord = '';
            vm.mistakes = 0;

            WordService.getWord().then(function(word){
                vm.word = word;
                vm.mangledWord = word.getMangledWord();
            });
        }
    }

    angular
        .module('wordGame.game')
        .controller('GameCtrl', ['$scope', '$interval', 'PlayerService', 'WordService', 'HighScoreService', GameCtrl]);
}());