import refs from './refs';
// import { PixabeyImages } from './fetchHendler';
// import { api } from '.';
// Коли робиться фетч - onSearchImage (onLoadMore) - малювати на сторінці заглушку
// export default function goSpinner() {
//   console.log('Крутимо колесико)))))))))))');
//   refs.spinner.classList.remove('visually-hidden');
// };

export default class Spinner {
    constructor() {
        this.refs = refs;
    }
  
    show() {
      this.refs.spinner.classList.remove('visually-hidden');
  };  
    hide() {
      this.refs.spinner.classList.add('visually-hidden'); 
  };
}