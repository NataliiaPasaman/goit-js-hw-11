
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30059530-99c96b166b7120acaaa07225e';

/**Список параметрів рядка запиту, які тобі обов'язково необхідно вказати:

key +
q + те, що вводить користувач в інпут
image_type +
orientation +
safesearch +
 */

const searchParams = new URLSearchParams({
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

export function fetchImages(valueUser) {
    return fetch(`${BASE_URL}?${searchParams}&q=${valueUser}`)
    .then((response) => {

        return response.json()});
}