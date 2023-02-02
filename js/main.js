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

console.log(QUERIES);

const elements = {
	title: document.getElementById('title'),
	search: document.getElementById('search_tab'),
	recentlyViewed: document.getElementById('recently_viewed')
}

document.title = SETTINGS.title;
document.getElementById('title').innerText = SETTINGS.title;
elements.search.placeholder = "search " + SETTINGS.search.engines[SETTINGS.search.default].name;


// CHANGE TAB TITLE
document.getElementById('title').addEventListener('input', function () {

	if (this.innerText === "") {
		this.innerText = SETTINGS.title;
	} else {
		SETTINGS.title = this.innerText;
		localStorage.setItem('SETTINGS', JSON.stringify(SETTINGS));
		document.title = SETTINGS.title;
	}

}, false);

// ON ENTER IN SEARCH TAB
document.getElementById('search_tab').addEventListener('keydown', function (e) {
	if (e.key === "Enter") {
		const query = this.value.trim();

		// Check if query is in QUERIES
		if (QUERIES[query] === undefined) QUERIES[query] = 1; else QUERIES[query]++;
		localStorage.setItem('QUERIES', JSON.stringify(QUERIES));

		// If it starts with a protocol, don't add the search engine URL
		if (query.startsWith('http://') || query.startsWith('https://')) {
			return window.location.href = query;
		}

		window.location.href = SETTINGS.search.engines[SETTINGS.search.default].url + this.value;
	}
}, false);


// POPULATE RECENTLY VIEWED

// Sort QUERIES by value
const sortedQueries = Object.keys(QUERIES).sort(function (a, b) {
	return QUERIES[b] - QUERIES[a];
});

// Get the first SETTINGS.recentlyViewed.max queries
const recentlyViewed = sortedQueries.slice(0, SETTINGS.recentlyViewed.max);

// Create a list item for each query
recentlyViewed.forEach(function (query) {

	const li = document.createElement('div');
	li.classList.add('grid-item');
	li.innerText = query;
	li.addEventListener('click', function () {
		QUERIES[query]++;
		localStorage.setItem('QUERIES', JSON.stringify(QUERIES));
		window.location.href = SETTINGS.search.engines[SETTINGS.search.default].url + query;
	});
	elements.recentlyViewed.appendChild(li);
})

// If SETTINGS.recentlyViewed.enabled is false or there are no queries, hide the tab
if (!SETTINGS.recentlyViewed.enabled) {
	elements.recentlyViewed.style.display = 'none';
}

if (recentlyViewed.length === 0) {
	const li = document.createElement('div');
	li.classList.add('grid-item');
	li.innerText = 'Your search history is empty';
	elements.recentlyViewed.appendChild(li);
}

// If SETTINGS.search.enabled is false, hide the tab
if (!SETTINGS.search.enabled) {
	elements.search.style.display = 'none';
}

