import Utils from '../../services/Utils.js'
import ChampionProvider from "../../services/ChampionProvider.js";
import { ENDPOINT } from '../../config.js'

export default class ChampionShow {
    async render() {
        let request = Utils.parseRequestURL()
        let champion = await ChampionProvider.getChampion(request.id)
        let notes = await ChampionProvider.getNotes(request.id)

        var favori = localStorage.getItem('favoris') ? localStorage.getItem('favoris').includes(request.id) : false
        function liker(id) {
            favori = localStorage.getItem('favoris') ? localStorage.getItem('favoris').includes(id) : false
            if (favori) {
                let favoris = JSON.parse(localStorage.getItem('favoris'));
                favoris = favoris.filter(champion => champion !== id);
                localStorage.setItem('favoris', JSON.stringify(favoris));
            } else {
                let favoris = JSON.parse(localStorage.getItem('favoris')) || [];
                favoris.push(id);
                localStorage.setItem('favoris', JSON.stringify(favoris));
            }
            document.querySelector('#content button svg').classList.toggle('empty')
            document.querySelector('#content button svg').classList.toggle('filledheart')
        }

        async function sendComment(champion) {
            let pseudo = document.querySelector('#pseudo').value;
            let commentaire = document.querySelector('#commentaire').value;
            let note = document.querySelector('#note').value;
            let data = {
                champion: champion,
                pseudo: pseudo,
                commentaire: commentaire,
                note: note
            };
            try {
                const response = await fetch(`http://localhost:3000/notes` + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                return response
            } catch (err) {
                console.log('Error getting documents', err)

            }
        }

        notes = notes.map(note => {
            return /*html*/`
            <div class="card shadow-sm">
                <h3>${note.pseudo}</h3>
                <p>${note.commentaire}</p>
                <p class="etoile">${note.note}</p>
            </div>
            `
        }).join('\n')

        return /*html*/`
            <h1>${champion.name}</br>${champion.title}</h1>
            <style>
            svg path {
                stroke: black;
            }
            
            svg.empty {
                stroke-width: 25px;
            }
            
            button:hover svg path,
            .empty path {
                fill: transparent;
            }
            
            .filledheart:hover path,
            .empty:hover path {
                fill: rgba(255, 0, 0, 0.5);
            }
            button:has(svg){
                background: none;
                border: none;
            }
            .etoile::after{
                content:'/5⭐️';
            }
            </style>
            <button onclick="${liker};liker('${request.id}')"><svg height="64px" width="64px" viewBox="-15 -20 501.701 501.701" class="${favori ? 'filledheart' : 'empty'}"><path fill="red" d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z"/></svg></button>
            <section class="section">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champion.image.full}" alt="${champion.name}">
                <p>${champion.blurb}</p>
                <p>Tags: ${champion.tags.map(tag => `<a href="#/champions?tag=${tag}">${tag}</a>`).join(", ")}</p>
            </section>
            <div style="display:flex;flex-direction:column;">
                <input type="text" id="pseudo" placeholder="Pseudo"/>
                <textarea id="commentaire" placeholder="Entrez votre commentaire"></textarea>
                <input type="number" id="note" max="10" min="0"/>
                <button onclick="${sendComment};sendComment('${request.id}')">Envoyer</button>
            </div>
            <section class="section">
                <h2>Commentaires</h2>
                ${notes}
            </section>
            <a href="/"><button>Back to home</button></a>
            <a href="#/champions"><button>Back to champions</button></a>
        `
    }
}

