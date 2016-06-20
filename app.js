(function () {
    'use strict';

    function initializeDatabase() {
        var config = {
            apiKey: "AIzaSyDfbl6pRLtCU_4swTCiaoDzqPoJiP8jLYc",
            authDomain: "wordgame-12ce3.firebaseapp.com",
            databaseURL: "https://wordgame-12ce3.firebaseio.com",
            storageBucket: "wordgame-12ce3.appspot.com"
        };

        firebase.initializeApp(config);
    }

    angular
        .module('wordGame', ['ui.router', 'wordGame.login'])
        .config(['$urlRouterProvider', initializeDatabase]);
}());