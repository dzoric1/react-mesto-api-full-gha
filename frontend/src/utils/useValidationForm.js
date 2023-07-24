import { useState } from "react";

function useValidationForm() {
  const [inputValues, setInputValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  function handleChange(e) {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
    setErrors({ ...errors, [name]: e.target.validationMessage })
    setIsValid(e.target.closest('.form').checkValidity())
  }

  function resetForm() {
    setInputValues({})
    setErrors({})
    setIsValid(false)
  }

  return { inputValues, errors, isValid, handleChange, resetForm, setInputValues }
}

export default useValidationForm