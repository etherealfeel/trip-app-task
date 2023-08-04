import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useForecastData = (url, singleDay = true) => {
  const [data, setData] = useState(singleDay ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useForecastData;
