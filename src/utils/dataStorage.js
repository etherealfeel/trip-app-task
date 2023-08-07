import tripPreview from '../images/trip_tokyo.jfif';
const TRIPS_DATA_KEY = 'trips';
const EMAIL_DATA_KEY = 'email';

const initialData = [
  {
    city: 'Tokyo',
    startDate: '29.08.2023',
    endDate: '31.08.2023',
    imgUrl: tripPreview,
  },
];

export const saveTrips = (trips) => {
  localStorage.setItem(TRIPS_DATA_KEY, JSON.stringify(trips));
};

export const saveEmail = (email) => {
  localStorage.setItem(EMAIL_DATA_KEY, email);
};

export const getTrips = () => {
  const savedTrips = localStorage.getItem(TRIPS_DATA_KEY);
  return savedTrips ? JSON.parse(savedTrips) : initialData;
};

export const getEmail = () => {
  return localStorage.getItem(EMAIL_DATA_KEY);
};
