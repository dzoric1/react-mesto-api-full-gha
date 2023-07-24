import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm"
import useValidationForm from "../utils/useValidationForm"

const AddCardPopup = ({ isOpen, onClose, onAddCard, isLoading }) => {

  const { inputValues, errors, isValid, handleChange, resetForm } = useValidationForm()

  useEffect(() => {
    if (isOpen) resetForm()
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddCard(inputValues)
  }

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoading ? 'Создание...' : 'Создать'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_location"
          type="text"
          placeholder="Название"
          name="name"
          required
          maxLength="30"
          minLength="2"
          value={inputValues.name || ''}
          onChange={handleChange} />
        <span className="popup__input-error name-error">{errors.name || ''}</span>
      </label>
      <label className="popup__fieldset">
        <input className="popup__form-input popup__form-input_type_url"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={inputValues.link || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error link-error">{errors.link || ''}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddCardPopup