import Countdown from 'react-countdown';

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

const CountdownTimer = ({ date }) => {
  return <Countdown date={date} renderer={renderer} />;
};

export default CountdownTimer;
