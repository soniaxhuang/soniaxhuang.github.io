let url1 = 'https://raw.githubusercontent.com/ngryman/lol-champions/master/champions.json';
let url2 = 'https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json';

let champCards = document.getElementById('LoL-Template')
let row = document.querySelector('.row');
let card, role, champNameEdited;

const roleArray = [
    { role: "Mage", imageurl:"https://fastcdn.mobalytics.gg/assets/lol/images/champions-classes/mage.svg" },
    { role: "Marksman", imageurl:"https://fastcdn.mobalytics.gg/assets/lol/images/champions-classes/marksman.svg" },
    { role: "Support", imageurl:"https://fastcdn.mobalytics.gg/assets/lol/images/champions-classes/support.svg" },
    { role: "Tank", imageurl:"https://fastcdn.mobalytics.gg/assets/lol/images/champions-classes/tank.svg" },
    { role: "Fighter", imageurl:"https://fastcdn.mobalytics.gg/assets/lol/images/champions-classes/fighter.svg" },
    { role: "Assassin", imageurl:"https://fastcdn.mobalytics.gg/assets/lol/images/champions-classes/assassin.svg" }
]

window.onload = function genContent() {
    fetch(url1)
        .then(response => response.json())
        .then(result => {
            champData = result;        
            setCards();
        })
        .catch()
        .finally()
}

function setCards() {
    champData.forEach((champ, index) => {
        let cloneContent = champCards.content.cloneNode(true);
        cloneContent.querySelector('.card-img-top').src = champ.icon;
        let roleImg = cloneContent.querySelector('.role');
        role = champ.tags[0];
        roleArray.forEach(x => {
            if (role == x.role) {
                roleImg.src=x.imageurl;
            }
        });
        cloneContent.querySelector('.card-title').innerText = champ.name;
        cloneContent.querySelector('.card-subtitle').innerText = champ.title;
        cloneContent.querySelector('.card-text').innerText = champ.description;

        //Set stats btn
        cloneContent.querySelector('.stats-btn').addEventListener('click', function() {
            let statsModal = document.getElementById('champStats');
            statsModal.querySelector('#champName').innerText = champ.name;
            champNameEdited = champ.name.replace(/\s/g, '');
            champNameEdited = champNameEdited.replace("'", '');
            champNameEdited = champNameEdited.replace('.', '');
            statsModal.querySelector('.stats-pic').src = `https://cdngarenanow-a.akamaihd.net/games/lol/2020/LOLwebsite/champion/${champNameEdited}_0.jpg`;
            statsModal.querySelector('p').innerText = champ.description;
            let champRole = champ.tags;
            statsModal.querySelector('.first').innerHTML = 
            `<strong>Role :</strong> ${champRole.join('/')}<br>
            <strong>HP :</strong> ${champ.stats.hp}<br>
            <strong>MP :</strong> ${champ.stats.mp}<br>
            <strong>Move Speed :</strong> ${champ.stats.movespeed}<br>
            `;
            statsModal.querySelector('.second').innerHTML = 
            `<strong>Armor :</strong> ${champ.stats.armor}<br>
            <strong>Magic Resist :</strong> ${champ.stats.spellblock}<br>
            <strong>Base AS :</strong> ${champ.stats.attackspeed}<br>
            <strong>Attack Damage :</strong> ${champ.stats.attackdamage}<br>
            `;
        })
        row.append(cloneContent)
    })
    
}