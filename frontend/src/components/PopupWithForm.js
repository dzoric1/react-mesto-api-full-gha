import { useEffect } from 'react'

function PopupWithForm({ name, title, isOpen, onClose, buttonTitle, children, onSubmit, isValid, resetForm }) {



  return (
    <div
      className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name} form`}
          name={`form-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`popup__submit ${!isValid ? 'popup__submit_type_disabled' : ''}`}
            type="submit"
            disabled={!isValid}
          >{buttonTitle}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;