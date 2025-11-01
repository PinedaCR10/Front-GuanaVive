export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

export function validateLogin(email: string, password: string) {
  const errors: Record<string, string> = {};
  if (!isEmail(email)) errors.email = "Correo inválido";
  if (password.length < 6) errors.password = "Mínimo 6 caracteres";
  return errors;
}

export function validateRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const errors: Record<string, string> = {};
  if (data.firstName.trim().length < 2) errors.firstName = "Nombre muy corto";
  if (data.lastName.trim().length < 2) errors.lastName = "Apellido muy corto";
  if (!isEmail(data.email)) errors.email = "Correo inválido";
  if (data.password.length < 6) errors.password = "Mínimo 6 caracteres";
  return errors;
}
