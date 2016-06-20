(function(){
    'use strict';

    function WordService($q, WordModelFactory){
        var service = this;
        var words = [];

        service.addWord = addWord;
        service.getWord = getWord;

        function addWord(word){
            firebase.database().ref()
                .child('/words')
                .push({
                    language: 'en',
                    value: word
                });
        }

        function getWord(){
            var deferred = $q.defer();

            if(words.length == 0) {
                firebase
                    .database().ref('words').once('value').then(function (data) {
                    var arrayOfWords = data.val();

                    if (Object.keys(arrayOfWords).length > 0) {
                        for (var key in arrayOfWords) {
                            var wordModel = WordModelFactory.getWord(arrayOfWords[key].value);
                            
                            words.push(wordModel);
                        }

                        deferred.resolve(words[0]);
                    } else {
                        //TODO: status messages
                        deferred.reject();
                    }
                });
            }

            if(words.length > 0){
                var rand = words[Math.floor(Math.random() * words.length)];
                deferred.resolve(rand);
            }
            
            return deferred.promise;
        }
    }

    angular
        .module('wordGame.game')
        .service('WordService', ['$q', 'WordModelFactory', WordService]);
}());