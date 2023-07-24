import AuthForm from "./AuthForm"

const Login = ({ onLogin }) => {

  return (
    <AuthForm
      title='Вход'
      buttonText='Войти'
      linkText='Нет Аккаунта? Создать'
      linkPath='/sign-up'
      onSubmit={onLogin}
    />
  )
}

export default Login