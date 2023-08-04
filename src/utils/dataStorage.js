import tripPreview from '../images/trip_tokyo.jfif';
const DATA_KEY = 'trips';

const initialData = [
  {
    city: 'Tokyo',
    startDate: '26.08.2023',
    endDate: '30.08.2023',
    imgUrl: tripPreview,
  },
];

export const saveTrips = (trips) => {
  localStorage.setItem(DATA_KEY, JSON.stringify(trips));
};

export const getTrips = () => {
  const savedTrips = localStorage.getItem(DATA_KEY);
  return savedTrips ? JSON.parse(savedTrips) : initialData;
};
