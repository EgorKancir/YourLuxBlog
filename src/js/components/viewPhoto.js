import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function viewPhotoFunc() {
    const observer = new MutationObserver((mutationsList, observer) => {
        const postPageGallery = document.querySelector(".post__gallery");
        console.log("postPageGallery is not hier ‼️");
        if (postPageGallery) {
            console.log("postPageGallery is hier ✅!");
            observer.disconnect(); 
            postPageGallery.addEventListener("click", (event) => {
                const target = event.target;
                if (target.tagName === "IMG") {
                    const imageSrc = target.src;
                    const instance = basicLightbox.create(`<img src="${imageSrc}" width="800">`);
                    instance.show();
                }
            });
        }
    });        
    observer.observe(document.body, { childList: true, subtree: true });
}
