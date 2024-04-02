import Home from './views/pages/Home.js';
import ChampionAll from './views/pages/ChampionAll.js';
import ChampionShow from './views/pages/ChampionShow.js';
import Error404 from './views/pages/Error404.js';
import Utils from './services/Utils.js';
import Favoris from './views/pages/Favoris.js';
import Search from './views/pages/Search.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home
    , '/champions': ChampionAll
    , '/champions/:id': ChampionShow
    , '/favoris': Favoris
    , '/search': Search
    , '/search/:id': Search
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.querySelector('#content');

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    parsedURL = parsedURL.split("?")[0];
    let page = routes[parsedURL] ? new routes[parsedURL] : new Error404

    content.innerHTML = await page.render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);