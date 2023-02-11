// rember https://www.google.com/s2/favicons?domain=

/*
	==========================================
	LOCAL STORAGE
	==========================================
 */

// Get SETTINGS from local storage
let SETTINGS = JSON.parse(localStorage.getItem('SETTINGS'));
let QUERIES = JSON.parse(localStorage.getItem('QUERIES'));

// If SETTINGS is null, set it to default
if (SETTINGS === null) {
	SETTINGS = {
		title: 'Default Title',
		recentlyViewed: {
			enabled: true,
			max: 5
		},
		search: {
			enabled: true,
			engines: [
				{
					name: 'Google',
					url: 'https://www.google.com/search?q='
				},
				{
					name: 'DuckDuckGo',
					url: 'https://duckduckgo.com/?q='
				},
				{
					name: 'Bing',
					url: 'https://www.bing.com/search?q='
				},
				{
					name: 'Yahoo',
					url: 'https://search.yahoo.com/search?p='
				},
				{
					name: 'Yandex',
					url: 'https://yandex.com/search/?text='
				},
				{
					name: 'YouTube',
					url: 'https://www.youtube.com/results?search_query='
				},
				{
					name: 'Wikipedia',
					url: 'https://en.wikipedia.org/w/index.php?search='
				}
			],
			default: 1
		}

	}
}
localStorage.setItem('SETTINGS', JSON.stringify(SETTINGS));

if (QUERIES === null) {
	QUERIES = {};
}
localStorage.setItem('QUERIES', JSON.stringify(QUERIES));

/*
	==========================================
	VARIABLES
	==========================================
 */

const elements = {
	title: document.getElementById('title'),
	search: document.getElementById('search_tab'),
	recentlyViewed: document.getElementById('recently_viewed')
}

/*
	==========================================
	MISC
	==========================================
 */

document.title = SETTINGS.title;
elements.search.placeholder = "Search " + SETTINGS.search.engines[SETTINGS.search.default].name;

/*
	==========================================
	SEARCH
	==========================================
 */

function search(query) {
	if (query === '') return console.log('No query');

	// Add query to QUERIES
	if (QUERIES[query] === undefined) QUERIES[query] = 1;
	else QUERIES[query]++;

	localStorage.setItem('QUERIES', JSON.stringify(QUERIES));

	// If it begins with a protocol, redirect to it
	if (query.startsWith('http://') || query.startsWith('https://')) window.location.href = query;
	else window.location.href = SETTINGS.search.engines[SETTINGS.search.default].url + query;
}

elements.search.addEventListener('keydown', (e) => {	
	if (e.key === 'Enter') search(elements.search.value);
});

/*
	==========================================
	RECENTLY VIEWED
	==========================================
 */

function updateRecentlyViewed() {
	// Clear the list
	elements.recentlyViewed.innerHTML = '';

	// Sort QUERIES by value
	let sortedQueries = Object.keys(QUERIES).sort((a, b) => QUERIES[b] - QUERIES[a]);

	// Loop through sorted QUERIES
	for (let i = 0; i < sortedQueries.length; i++) {
		// If the max has been reached, stop
		if (i >= SETTINGS.recentlyViewed.max) break;

		// Create list item
		let li = document.createElement('li');
		li.innerHTML = sortedQueries[i];
		li.addEventListener('click', () => search(sortedQueries[i]));

		const favicon = document.createElement('img');
		// quality of 512
		favicon.src = `https://www.google.com/s2/favicons?domain=${sortedQueries[i]}&sz=16`;
		favicon.alt = sortedQueries[i] + ' favicon'; 
		favicon.width = 16;
		favicon.height = 16;
		li.prepend(favicon);
		
		
		// Append list item to list
		elements.recentlyViewed.appendChild(li);
	}
}

updateRecentlyViewed();

/*
	==========================================
	CONTEXT MENU
	==========================================
 */

