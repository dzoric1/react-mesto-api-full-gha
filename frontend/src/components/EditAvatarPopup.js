import { useEffect } from "react";
import useValidationForm from "../utils/useValidationForm";
import PopupWithForm from "./PopupWithForm"

const EditAvatarProfilePopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {

  const { inputValues, errors, isValid, handleChange, resetForm } = useValidationForm()

  useEffect(() => {
    if (isOpen) resetForm()
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputValues);
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_avatar"
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          required
          value={inputValues.avatar || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error avatar-error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarProfilePopup