const
    TIME = document.getElementById('time'),
    SEARCH = document.getElementById('search'),
    SEARCH_BUTTON = document.getElementById('search-button'),
    BG_IMG = document.getElementById("background__image");

const 
    NEW_IMAGE = document.getElementById('new__image');

// Every second, update the time
setInterval(() => {
    let date = new Date();
    TIME.innerHTML = `${date.getHours()}:${date.getMinutes()}`;

    if (date.getMinutes() < 10) TIME.innerHTML = `${date.getHours()}:0${date.getMinutes()}`;
    if (date.getHours() < 10) TIME.innerHTML = `0${date.getHours()}:${date.getMinutes()}`;
}, 20);

// on any keyboard input, focus the search bar - except tab / shift tab
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') SEARCH.focus();
    if (e.key === 'Enter') SEARCH_BUTTON.click();
});

// on Search button click, open a new tab with the search query in current tab
SEARCH_BUTTON.addEventListener('click', () => {
    window.open(`https://google.com/search?q=${SEARCH.value}`, '_self');
});

// on new image button click, change the background image
NEW_IMAGE.addEventListener('click', () => {
    console.log("SEARCH.value")
    if (SEARCH.value === '') SEARCH.value = 'nature';
    BG_IMG.src = `https://source.unsplash.com/1920x1080/?${SEARCH.value}`;
    
});