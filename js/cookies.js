let flappyCookies = {
    init: function() {
        let hs = flappyCookies.parse()['high_score'];

        if (hs) {
            game.highScore = hs;
        } else {
            document.cookie = 'high_score=0'
        }
    },
    saveHighScore: function() {
        document.cookie = "high_score=" + game.highScore;
    },
    parse: function() {
        return document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value)}), {})
    }
}