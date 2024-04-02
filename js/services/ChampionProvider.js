import { ENDPOINT } from '../config.js'

export default class ChampionProvider {
    static options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    static response = {
        data: [],
        infos: {
            prev: null,
            next: null,
            last: null
        }
    }

    static limit = 9;

    static fetchChampions = async (tag = '', page = 1, liste = []) => {
        try {
            if (tag || liste.length > 0) {
                const response = await fetch(`${ENDPOINT}/champions`, this.options)
                let json = await response.json();
                this.response.infos.prev = page > 1 ? page - 1 : null;
                if (tag) {
                    json = json.filter(champion => champion.tags.includes(tag));
                    this.response.data = json.slice((page - 1) * this.limit, page * this.limit);
                    this.response.infos.next = page < Math.floor(json.length / this.limit) ? parseInt(page) + 1 : null;
                    this.response.infos.last = Math.floor(json.length / this.limit);
                } else {
                    this.response.data = json.filter(champion => liste.includes(champion.id))
                    this.response.infos.next = page < this.response.data.length / this.limit ? parseInt(page) + 1 : null;
                    this.response.infos.last = Math.floor(this.response.data.length / this.limit) == this.response.data.length / this.limit ? Math.floor(this.response.data.length / this.limit) : Math.floor(this.response.data.length / this.limit) + 1;
                    this.response.data = this.response.data.slice((page - 1) * this.limit, page * this.limit);
                }
            } else {
                const response = await fetch(`${ENDPOINT}/champions?_page=${page}&_per_page=${this.limit}`, this.options)
                let json = await response.json();
                this.response.data = json['data'];
                this.response.infos.prev = json['prev'];
                this.response.infos.next = json['next'];
                this.response.infos.last = json['last'];
            }
            return this.response
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static fetchRandomChampions = async () => {
        try {
            const response = await fetch(`${ENDPOINT}/champions`, this.options)
            const json = await response.json();
            const shuffled = json.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 3);
            return selected;
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static getChampion = async (id) => {
        try {
            const response = await fetch(`${ENDPOINT}/champions/` + id, this.options)
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static getCount = async () => {
        try {
            const response = await fetch(`${ENDPOINT}/champions`, this.options)
            const json = await response.json();
            return json.length
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static searchChampions = async (query) => {
        try {
            const response = await fetch(`${ENDPOINT}/champions`, this.options)
            const json = await response.json();
            let results = json.filter(champion => champion.name.toLowerCase().includes(query.toLowerCase()));
            return results
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static getNotes = async (id) => {
        try {
            const response = await fetch(`${ENDPOINT}/notes?champion=` + id, this.options)
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }
}