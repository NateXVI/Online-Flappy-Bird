
const leaderboard = {
    get: async function() {
        const name = flappyCookies.parse()['player_name'];
        //console.log(name);
            let response = await fetch('https://flappy-bird-leaderboard.herokuapp.com/api/get/leaderboard', {method: 'get'});
            let data = await response.json();
            return data;
        
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
// console.log(document.getElementById('leaderboard'));

leaderboard.get()
.then(result => {
    result = result.filter(value => value.player_score != 0)
    for(let i = 0; i < result.length; i++){
        let r = i+1;
        let tr = '<tr class="th">';

        tr += `<td class="th">${r}</td><td class="th">${result[i].player_name}</td><td class="th">${result[i].player_score}</td></tr>`;
        table.innerHTML += tr;
    }
});
}