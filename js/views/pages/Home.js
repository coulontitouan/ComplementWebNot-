// Instantiate API
import ChampionProvider from "../../services/ChampionProvider.js";

export default class Home {

    async render() {
        let champions = await ChampionProvider.fetchRandomChampions(3)
        let html = champions.map(champion =>
            `
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
        ).join('\n');

        return /*html*/`
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Champions example</h1>

                    </div>
                </div>
            </section>
            <h2>3 champions aléatoires</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
    }
}