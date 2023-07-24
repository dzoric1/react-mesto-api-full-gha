import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useValidationForm from '../utils/useValidationForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {

  const { inputValues, errors, isValid, handleChange, setInputValues, resetForm } = useValidationForm()
  const currentUser = useContext(CurrentUserContext)

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(inputValues)
  }

  useEffect(() => {
    if (isOpen) resetForm()
    setInputValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'edit'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_name"
          type="text" placeholder="Имя"
          name="name"
          required maxLength="40"
          minLength="2"
          value={inputValues.name || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error name-error">{errors.name}</span>
      </label>
      <label className="popup__fieldset">
        <input className="popup__form-input popup__form-input_type_job"
          type="text"
          placeholder="Деятельность"
          name="about"
          required maxLength="200"
          minLength="2"
          value={inputValues.about || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error about-error">{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup