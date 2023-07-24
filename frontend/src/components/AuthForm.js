import { Link } from "react-router-dom"
import useValidationForm from '../utils/useValidationForm';

const AuthForm = ({
  title,
  buttonText,
  linkText,
  linkPath,
  onSubmit
}) => {

  const { inputValues, errors, isValid, handleChange } = useValidationForm()

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(inputValues)
  }

  return (
    <section className="content__auth auth">
      <h2 className="auth__title">{title}</h2>
      <form
        className="auth__form form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="auth__fieldset">
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            name='email'
            required
            value={inputValues.email || ''}
            onChange={handleChange}
          />
          <span className="auth__input-error">{errors.email}</span>
        </label>
        <label className="auth__fieldset">
          <input
            className="auth__input"
            type="password"
            placeholder="Пароль"
            name='password'
            required
            minLength="6"
            value={inputValues.password || ''}
            onChange={handleChange}
          />
          <span className="auth__input-error">{errors.password}</span>
        </label>
        <button
          type="submit"
          className={`auth__submit ${!isValid ? 'auth__submit_type_disabled' : ''}`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
        <Link className="auth__link" to={linkPath}>{linkText}</Link>
      </form>

    </section >

  )
}

export default AuthForm