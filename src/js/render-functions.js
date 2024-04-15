import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery-list a', {
 
  captionsData: 'alt',
  captionDelay: 250,
});

const renderData = async data => {
  if (data.length === 0) {
    return;
  }
  
  let galleryHTML = '';
  if (document.querySelector('.gallery-list') != null) {
    galleryHTML = document.querySelector('.gallery-list').innerHTML;
  }
  galleryHTML += await data
    .map(item => {
      let galleryItem = `
            <li class="gallery-item">
                <a class="gallery-link" href="${item.largeImageURL}">
                    <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" />
                </a>
                <ul class="item-info">
                    <li><h3 class="item-title">Likes</h3>    <p class="item-text">${item.likes}</p>
                    <li><h3 class="item-title">Views</h3>    <p class="item-text">${item.views}</p>
                    <li><h3 class="item-title">Comments</h3> <p class="item-text">${item.comments}</p>
                    <li><h3 class="item-title">Downloads</h3><p class="item-text">${item.downloads}</p>
                </ul>
            </li>
        `;
      return galleryItem;
    })
    .join('');
  gallery.innerHTML = `<ul class="gallery-list">${galleryHTML}</ul>`;

  lightbox.refresh();
};

export default renderData;