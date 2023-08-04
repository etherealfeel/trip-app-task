import { useState } from 'react';
import './Form.css';
import cityPictureService from '../../../services/cityPictureService';
import { convertDate } from '../../../utils/convertDate';
import mockedData from '../../../mocks/citiesData.json';

const Form = ({ setModal, onTripCreate }) => {
  const initialFormData = {
    city: '',
    startDate: '',
    endDate: '',
    imgUrl: '',
  };

  const minDate = new Date(),
    maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await cityPictureService.getCityPicture(formData.city);
    const newTrip = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        key === 'startDate' || key === 'endDate' ? convertDate(value) : value,
      ])
    );
    onTripCreate(newTrip, imgUrl);
    setFormData();
    e.target.reset();
    setFormData(initialFormData);
  };

  return (
    <form action="submit" className="trip-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        <div className="form-field">
          <label htmlFor="city" className="field-label">
            <span className="required">*</span> City
          </label>
          <input
            type="text"
            className="field-input city-input"
            id="city"
            name="city"
            placeholder="Please select a city"
            onChange={(e) => handleChange(e)}
            list="options"
            required
          />
          <datalist id="options">
            {mockedData.map((option, index) => (
              <option key={index} value={option.name} />
            ))}
          </datalist>
        </div>
        <div className="form-field">
          <label htmlFor="startDate" className="field-label">
            <span className="required">*</span> Start date
          </label>
          <input
            type="date"
            className="field-input date-input"
            id="startDate"
            name="startDate"
            placeholder="Select date"
            onChange={(e) => handleChange(e)}
            required
            min={minDate.toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
          />
        </div>
        <div className="form-field">
          <label htmlFor="endDate" className="field-label">
            <span className="required">*</span> End date
          </label>
          <input
            type="date"
            className="field-input date-input"
            id="endDate"
            name="endDate"
            placeholder="Select date"
            onChange={(e) => handleChange(e)}
            required
            min={minDate.toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="form-btns">
        <button className="form-btn" type="reset" onClick={() => setModal(false)}>
          Cancel
        </button>
        <button className="form-btn btn-done" type="submit">
          Done
        </button>
      </div>
    </form>
  );
};

export default Form;
