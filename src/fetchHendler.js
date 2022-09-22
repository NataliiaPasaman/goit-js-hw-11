
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30059530-99c96b166b7120acaaa07225e';


const searchParams = new URLSearchParams({
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

export function fetchImages(searchImg) {
    return fetch(`${BASE_URL}?${searchParams}&q=${searchImg}`)
    .then((response) => {

        return response.json()});
}

// Асинхронна функція - не працює!!!

// export async function fetchImages(valueUser) {
//     const request = await fetch(`${BASE_URL}?${searchParams}&q=${valueUser}`);
//     const response = await response.json();

//     return response;
// }