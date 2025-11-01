export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

// Regex del backend: debe contener al menos una mayúscula, una minúscula y un número
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Mínimo 6 caracteres";
  }
  if (password.length > 20) {
    return "Máximo 20 caracteres";
  }
  if (!PASSWORD_REGEX.test(password)) {
    return "Debe contener al menos una mayúscula, una minúscula y un número";
  }
  return null;
}

export function validateLogin(email: string, password: string) {
  const errors: Record<string, string> = {};
  if (!isEmail(email)) errors.email = "Correo inválido";
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
}

export function validateRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const errors: Record<string, string> = {};
  
  if (data.firstName.trim().length < 2) {
    errors.firstName = "Mínimo 2 caracteres";
  }
  if (data.firstName.trim().length > 50) {
    errors.firstName = "Máximo 50 caracteres";
  }
  
  if (data.lastName.trim().length < 2) {
    errors.lastName = "Mínimo 2 caracteres";
  }
  if (data.lastName.trim().length > 50) {
    errors.lastName = "Máximo 50 caracteres";
  }
  
  if (!isEmail(data.email)) {
    errors.email = "Correo inválido";
  }
  
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  return errors;
}
