let flappyCookies = {
    init: function() {
        let hs = flappyCookies.parse()['high_score'];
        let playerName = flappyCookies.parse()['player_name'];
        let playerID = flappyCookies.parse()['player_id'];

        if (hs) {
            game.highScore = hs;
        } else {
            document.cookie = 'high_score=0'
        }
        if (playerName){
            document.getElementById('player-name').value = playerName;
            //console.log("player name is " + playerName)
        } else {
            document.cookie = 'player_name='
        }
        if(!playerID) {
            let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });
            console.log(id);
            document.cookie = 'player_id='+id;
        }
    },
    saveHighScore: function() {
        document.cookie = "high_score=" + game.highScore;
    },
    parse: function() {
        return document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value)}), {})
    },
    savePlayerName: function() {
        document.cookie = 'player_name=' + document.getElementById('player-name').value;
        console.log(flappyCookies.parse());
    }
}