import './Modal.css';

const Modal = ({ active, setActive, children }) => {
  if (!active) return null;
  return (
    <div className="modal-overlay" onClick={() => setActive(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <p className="modal-title">Create trip</p>
        <p className="modal-close" onClick={() => setActive(false)}>
          &times;
        </p>
        <hr className="modal-line" />
        {children}
      </div>
    </div>
  );
};

export default Modal;
