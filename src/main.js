import renderData from './js/render-functions';
import pixabay from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let page = 1;
let searchTerm = '';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

const searchBtn = document.getElementById('submit');
searchBtn.disabled = true;

const gallery = document.getElementById('gallery');
const loadingIndicator = document.getElementById('loading-indicator');
const loadMoreBtn = document.getElementById('load-more-btn');

searchInput.addEventListener('input', e => {
  searchBtn.disabled = searchInput.value.trim() === '';
});

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  showLoadingIndicator();

  searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    console.log('Please enter a search term.');
    return showError('Please enter a search term.');
  }
  searchInput.value = '';
  page = 1;
  await getImages(page);
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  await getImages(page);
});

async function getImages(page) {
  showLoadingIndicator();
  console.log('page:', page);

  try {
    const pageItems = 15;
    loadMoreBtn.style.display = 'none';

    //const totalHits = 30;


    let response = await pixabay(searchTerm, page, pageItems);
    const data = response.data;
    const hits = data.hits;
    renderData(hits);

    const totalHits = data.totalHits || 0;
    console.log('totalHits:', totalHits);
    if (totalHits === 0) {
      const msg = `main: Sorry, there are no images matching your search query: [${searchTerm}]. Please try again!`;
      hideLoadingIndicator();
      return showError(msg);
    }
    if (totalHits <= page * pageItems) {
      const msg = "We're sorry, but you've reached the end of search results.";
      return showInfo(msg);
    }
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoadingIndicator();
  }
}

function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
  loadMoreBtn.style.display = 'none';
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}

 function showInfo(message, position = 'center') {
    iziToast.info({
      title: 'Info',
      message: message,
      position: position,
      timeout: 10000,
    });
  }
   function showError(message, position = 'center') {
    iziToast.error({
      title: 'Error',
      message: message,
      position: position, 
      timeout: 10000,
    });
  }
