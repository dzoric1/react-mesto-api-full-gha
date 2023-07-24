import success from '../assets/images/success.svg'
import failure from '../assets/images/failure.svg'

const InfoTooltip = ({ onClose, isOpen, isSuccess, text }) => {
  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_info">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <img
          className='popup__info-icon'
          src={isSuccess ? success : failure}
          alt="Успешно"
        />
        <p
          className='popup__info-text'>
          {text || ''}
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip