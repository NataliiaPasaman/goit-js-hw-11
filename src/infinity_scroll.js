import refs from './refs';
import { onLoadMore } from './index';
import { api } from './index';

const options = {
    rootMargin: '400px',
}
const callbackEntry = function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {

            if(!api.searchQuery) {
                return;
            }
            onLoadMore();
        }
    });
};

const observer = new IntersectionObserver(callbackEntry, options);
observer.observe(refs.btn_load);

export { observer };
