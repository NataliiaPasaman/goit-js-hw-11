
// Асинхронна функція - не працює!!!

// export async function fetchImages(valueUser) {
//     const request = await fetch(`${BASE_URL}?${searchParams}&q=${valueUser}`);
//     const response = await response.json();

//     return response;
// }

export class PixabeyImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.arrayImages = [];
    this.totalImages = 0;
  }

  fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '30059530-99c96b166b7120acaaa07225e';

    const searchParams = new URLSearchParams({
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    return fetch(`${BASE_URL}?${searchParams}&q=${this.searchQuery}`)
    .then(response => {
        return response.json();
      })
      .then(dataImages => {
        this.page += 1;
        this.totalImages = dataImages.totalHits;
        return dataImages.hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
