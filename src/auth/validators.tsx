export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

export function validateLogin(email: string, password: string) {
  const errors: Record<string, string> = {};
  if (!isEmail(email)) errors.email = "Correo inválido";
  if (password.length < 6) errors.password = "Mínimo 6 caracteres";
  return errors;
}

export function validateRegister(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const errors: Record<string, string> = {};
  if (data.name.trim().length < 2) errors.name = "Nombre muy corto";
  if (data.username.trim().length < 3) errors.username = "Usuario muy corto";
  if (!isEmail(data.email)) errors.email = "Correo inválido";
  if (data.password.length < 6) errors.password = "Mínimo 6 caracteres";
  return errors;
}
