import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30059530-99c96b166b7120acaaa07225e';

export class PixabeyImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.arrayImages = [];
    this.totalImages = 0;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    try {
      const response = await axios.get(
        `${BASE_URL}?${searchParams}&q=${this.searchQuery}`
      );

    //   this.page += 1;
      this.totalImages = response.data.totalHits;

      const images = await response.data.hits;
      console.log('images', images);
      return images;
    } catch (error) {
      console.log(error);
    }
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