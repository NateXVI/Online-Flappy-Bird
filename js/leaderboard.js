
const leaderboard = {
    get: async function() {
        const name = flappyCookies.parse()['player_name'];
        //console.log(name);
        if (name && name != "") {
            let response = await fetch('https://flappy-bird-leaderboard.herokuapp.com/api/get/leaderboard', {method: 'get'});
            let data = await response.json();
            return data;
        
        }
        
    },
    saveScore: async function() {
        const c = flappyCookies.parse()
        const name = c['player_name'];
        if (name && name != "") {
            const id = c.player_id;
            const score = c.high_score;
            let response = await fetch(`https://flappy-bird-leaderboard.herokuapp.com/api/post/score?player_id=${id}&player_name=${name}&player_score=${score}`);
        }
    }
}

leaderboard.saveScore();
window.onload = () => {
let table = document.getElementById('leaderboard');
console.log(document.getElementById('leaderboard'));

leaderboard.get()
.then(result => {
    console.log(result);

    for(let i = 0; i < result.length; i++){
        let r = i+1;
        let tr = "<tr>";

        tr += `<td>${r}</td><td>${result[i].player_name}</td><td>${result[i].player_score}</td></tr>`;
        table.innerHTML += tr;
    }
});
}