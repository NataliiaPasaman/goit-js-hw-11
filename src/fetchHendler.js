
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30059530-99c96b166b7120acaaa07225e';

// let per_page = 10;


const searchParams = new URLSearchParams({
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

export function fetchImages(searchImg) {
    return fetch(`${BASE_URL}?${searchParams}&q=${searchImg}&per_page=40&page=2`)
    .then((response) => {

        return response.json()});
}

// Асинхронна функція - не працює!!!

// export async function fetchImages(valueUser) {
//     const request = await fetch(`${BASE_URL}?${searchParams}&q=${valueUser}`);
//     const response = await response.json();

//     return response;
// }