import refs from './refs';
import { onLoadMore } from './index';
import { api } from './index';
// import './index.js';

// const div = document.createElement('div');
// div.classList.add('before-scroll');
// div.classList.add('visually-hidden');
// refs.gallery.after(div);

const options = {
    rootMargin: '400px',
}
const callback = function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log("Привет");
            if(!api.searchQuery) {
                return;
            }
            onLoadMore();
        }
    });
};

const observer = new IntersectionObserver(callback, options);
observer.observe(refs.btn_load);

export { observer };


//Якщо контент закінчився - IntersectionObserver.unobserve()
//припиняє спостерігати за змінами видимості цільового елемента

// observer.unobserve(document.getElementById("elementToObserve"));