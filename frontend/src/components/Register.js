import AuthForm from "./AuthForm"

const Register = ({ onRegister }) => {

  return (
    <AuthForm
      title='Регистрация'
      buttonText='Зарегистрироваться'
      linkText='Уже зарегистрированы? Войти'
      linkPath='/sign-in'
      onSubmit={onRegister}
    />
  )
}

export default Register