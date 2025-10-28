export type Subscription = {
  id: string;
  name: string;
  email: string;
  plan: "Básico" | "Premium" | "Plus";
  status: "Activo" | "Inactivo";
  createdAt: string;
  lastAccess: string;
};
