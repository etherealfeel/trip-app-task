import './Main.css';
import { BsSearchHeart } from 'react-icons/bs';
import useForecastData from '../../hooks/useForecastData';
import { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { splitDate } from '../../utils/splitDate';
import { weekdays } from '../../mocks/weekdays';
import { IoMdCreate } from 'react-icons/io';
import Modal from '../Modal';
import Form from '../Modal/Form';
import { getTrips, saveTrips } from '../../utils/dataStorage';

const Main = () => {
  const [trips, setTrips] = useState(getTrips());
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const apiTodayUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/today?unitGroup=metric&include=days&iconSet=icons2&key=${process.env.REACT_APP_WEATHER_API_KEY}&contentType=json`;
  const apiFromToUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/2023-08-03/2023-08-10?unitGroup=metric&include=days&iconSet=icons2&key=${process.env.REACT_APP_WEATHER_API_KEY}&contentType=json`;
  const { data, loading, error } = useForecastData(apiTodayUrl);
  const { data: weekData, loading: weekLoading, error: weekError } = useForecastData(apiFromToUrl, false);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  const handleTripClick = (i) => {
    setSelectedTrip(trips[i]);
  };

  const handleTripCreate = (newTrip, imgUrl) => {
    newTrip = { ...newTrip, imgUrl };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  useEffect(() => {
    const filteredAndSortedData = trips
      .filter((item) => item.city.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    setFilteredTrips(filteredAndSortedData);
  }, [trips, searchTerm]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    let filteredList = [];
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredTrips(trips);
    } else {
      filteredList = filteredTrips.filter((item) => item.city.toLowerCase().includes(value.toLowerCase()));
    }
    setFilteredTrips(filteredList);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div>Your trip has already began!</div>;
    } else {
      return (
        <ul className="selected-countdown">
          <li className="countdown-item">
            <h4 className="countdown-item-number">{days}</h4>
            <p className="countdown-item-name">days</p>
          </li>
          <li className="countdown-item">
            <h4 className="countdown-item-number">{hours}</h4>
            <p className="countdown-item-name">hours</p>
          </li>
          <li className="countdown-item">
            <h4 className="countdown-item-number">{minutes}</h4>
            <p className="countdown-item-name">minutes</p>
          </li>
          <li className="countdown-item">
            <h4 className="countdown-item-number">{seconds}</h4>
            <p className="countdown-item-name">seconds</p>
          </li>
        </ul>
      );
    }
  };

  if (loading || weekLoading) {
    return <div>Loading...</div>;
  }

  if (error || weekError) {
    return <div>Error occured.</div>;
  }
  return (
    <div className="forecast">
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="modal-content">
          <Form setModal={setModalActive} onTripCreate={handleTripCreate} />
        </div>
      </Modal>
      <div className="forecast-panel">
        <div className="forecast-container">
          <header className="forecast-header">
            <div className="forecast-title title">
              Weather <span style={{ fontWeight: '700' }}>Forecast</span>
            </div>
          </header>
          <main className="forecast-main">
            <div className="forecast-search">
              <BsSearchHeart className="search-icon" size={32} />
              <input
                className="search-input"
                type="text"
                placeholder="Search your trip"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
            <div className="forecast-trips-container">
              <ul className="forecast-trips">
                {filteredTrips &&
                  filteredTrips.map((trip, i) => (
                    <li
                      className={`forecast-trip${selectedTrip === trips[i] ? '--selected' : ''}`}
                      key={i}
                      onClick={() => handleTripClick(i)}
                    >
                      <img className="trip-preview" alt="trip" src={trip.imgUrl} width={200} height={200} />
                      <div className="trip-bottom">
                        <h4 className="trip-title title">{trip.city}</h4>
                        <p className="trip-descr">
                          {trip.startDate} - {trip.endDate}
                        </p>
                      </div>
                    </li>
                  ))}
                <li className="trip-new forecast-trip" onClick={() => setModalActive(true)}>
                  <h4>Add trip</h4>
                  <IoMdCreate size={32} />
                </li>
              </ul>
            </div>
          </main>
          <div className="forecast-weekly">
            <h3 className="weekly-title title">Week</h3>
            <ul className="weekly-list">
              {weekData &&
                weekData.days?.map((day, i) => (
                  <li className="weekly-item" key={i}>
                    <h4 className="item-day">{weekdays[new Date(day.datetime).getDay()]}</h4>
                    <img
                      src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${day.icon}.png`}
                      alt="weathertype"
                      className="item-img"
                      width={80}
                      height={80}
                    />
                    <p className="item-temp">
                      {day.tempmax}°/{day.tempmin}°
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="trip-selected">
        <div className="selected-container">
          {data.days ? (
            <>
              <h3 className="selected-day">{weekdays[new Date(data.days[0].datetime).getDay()]}</h3>
              <div className="selected-weather">
                <img
                  className="selected-weathertype"
                  src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${data.days[0].icon}.png`}
                  alt="weathertype"
                  width={100}
                  height={100}
                />
                <p className="selected-temp">{data.days[0].temp}°C</p>
              </div>
            </>
          ) : (
            <p>Loading..</p>
          )}
          <p className="selected-location">{data?.resolvedAddress} </p>
          <Countdown date={new Date(...Object.values(splitDate(selectedTrip.startDate)))} renderer={renderer} />
        </div>
      </div>
    </div>
  );
};

export default Main;
