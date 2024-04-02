import ChampionProvider from "../../services/ChampionProvider.js";
import Utils from '../../services/Utils.js'

export default class ChampionAll {

    async render() {
        let request = Utils.parseRequestURL()
        let champions = await ChampionProvider.searchChampions(request.id);

        let view =  /*html*/`
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${champions.length > 0 ? champions.map(champion =>
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm" style="border-radius: var(--bs-card-border-radius) !important;">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <rect width="100%" height="100%" fill="#55595c"/>
                            <image xlink:href="https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${champion.id}_0.jpg" x="0" y="0" height="100%" width="100%" preserveAspectRatio="none"/>
                            <text x="50%" y="50%" fill="#eceeef" dy=".3em" style="font-size: 2em">${champion.name}</text>
                        </svg>
                        <div class="card-body">
                            <p class="card-text">${champion.blurb ? champion.blurb.slice(0, 100) + "..." : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="#/champions/${champion.id}" class="btn btn-sm btn-outline-secondary">+ détail sur ${champion.name}</a>
                                </div>
                                <small class="text-body-secondary">${champion.id}</small>
                            </div>
                        </div>
                    </div>
                </div>
                    `
        ).join('\n ')
                : `<h1>Aucun champion trouvé</h1>`}
            </div>
        `
        return view
    }

}