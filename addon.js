const { addonBuilder, getRouter } = require('stremio-addon-sdk');
const fetch = require('node-fetch');

// Função para buscar filmes em um site de torrents
async function searchMovies(query) {
    const url = `https://api.thepiratebay.org/q.php?q=${encodeURIComponent(query)}&cat=207`;
    const response = await fetch(url);
    const torrents = await response.json();
    return torrents.map(torrent => ({
        id: torrent.id,
        name: torrent.name,
        type: 'movie',
        infoHash: torrent.infoHash,
        magnet: torrent.magnet,
        poster: torrent.poster,
        releaseDate: torrent.releaseDate,
        runtime: torrent.runtime,
    }));
}

// Construindo o add-on
const builder = new addonBuilder({
    id: 'meuaddon',
    version: '1.0.0',
    name: 'Addon de Torrents',
    description: 'Um add-on para buscar filmes em sites de torrents.',
});

// Definindo o endpoint para buscar filmes
builder.defineSearchHandler(({ query }) => {
    return searchMovies(query);
});

// Inicializando o add-on
const addonInterface = builder.getInterface();
module.exports = getRouter(addonInterface);
