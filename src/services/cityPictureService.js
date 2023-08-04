async function getCityPicture(cityName) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      if (data.results[0].urls && data.results[0].urls.thumb) {
        return data.results[0].urls.thumb;
      }
      return null;
    } catch (error) {
      console.error('Error fetching city picture:', error);
      return null;
    }
  }
  
  export default { getCityPicture };
  