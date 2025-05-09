// const postsGallery = document.getElementById("postsGallery");

// export async function renderPostCard() {
//     const source = document.getElementById("post-card__template").innerHTML.trim();
//     const template = Handlebars.compile(source);
//     try {
//         const {data} = await axios.get('http://localhost:3000/posts');  
//         console.log(data);
        
//         postsGallery.innerHTML =  data.map(post => template(post)).join('');
//     } catch (error) {
//         console.error("Помилка рендеру:", error);
//     }
// }