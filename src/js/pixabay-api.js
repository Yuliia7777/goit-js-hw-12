import axios from 'axios';

const pixabay = async (searchTerm, page, pageItems = 15) => {
  console.log(`pixabay:search=>[${searchTerm}]`);
  
  const baseUrl = 'https://pixabay.com/api/';
  const api_key = '43273309-00e3b6b60594751f75d0d2555';
  const queryParams = {
    key: api_key,
    q: searchTerm,
    safesearch: true,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: pageItems,
    page: page,
  };

  

  try {
    const url = baseUrl;
    const config = { params: queryParams };
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    console.error('pixabay:Error fetching images:', error);
    throw error;
  } finally {
    console.log(`pixabay:search.end;`);
  }
};


export default pixabay;