# Sistema de Rutas y Autenticación - GuanaVive

## 📋 Resumen

El sistema de rutas está completamente configurado con protección de rutas basada en roles. Los usuarios admin tienen acceso completo al panel administrativo, mientras que los usuarios regulares son redirigidos automáticamente a su área correspondiente.

## 🔐 Guards de Protección

### 1. **PublicRoute** (`src/shared/guards/PublicRoute.tsx`)
- **Propósito**: Protege rutas públicas (login, register) para usuarios no autenticados
- **Comportamiento**: 
  - Si el usuario **NO** está autenticado → Permite acceso
  - Si el usuario **ES admin** → Redirige a `/admin`
  - Si el usuario **ES regular** → Redirige a `/dashboard`
- **Rutas protegidas**: `/auth/login`, `/auth/register`

### 2. **AdminRoute** (`src/shared/guards/AdminRoute.tsx`)
- **Propósito**: Protege rutas administrativas para usuarios admin únicamente
- **Comportamiento**:
  - Si el usuario **NO** está autenticado → Redirige a `/login`
  - Si el usuario **NO es admin** → Redirige a `/` (home)
  - Si el usuario **ES admin** → Permite acceso
- **Rutas protegidas**: `/admin/*`

### 3. **PrivateRoute** (`src/shared/guards/PrivateRoute.tsx`)
- **Propósito**: Protege rutas para cualquier usuario autenticado
- **Comportamiento**:
  - Si el usuario **NO** está autenticado → Redirige a `/auth/login`
  - Si el usuario **ESTÁ** autenticado → Permite acceso
- **Rutas protegidas**: `/dashboard`, `/profile`, `/plans`, `/feed`, `/my-publications`, etc.

## 🗺️ Mapa de Rutas

### Rutas Públicas (Sin autenticación)
```
/ ........................... Homepage
/gallery .................... Galería
/galeria .................... Galería (español)
/galeria/:id ................ Detalle de galería
/categorias/:slug ........... Detalle de categoría
```

### Rutas de Autenticación (Solo no autenticados)
```
/auth/login ................. Login (redirige a /admin o /dashboard si ya está autenticado)
/auth/register .............. Registro (redirige a /admin o /dashboard si ya está autenticado)
```

### Rutas de Usuario (Requiere autenticación)
```
/dashboard .................. Dashboard de usuario
/profile .................... Perfil de usuario
/plans ...................... Planes de suscripción
/feed ....................... Feed de publicaciones
/user-home .................. Home de usuario
/my-publications ............ Mis publicaciones
/my-publications/create ..... Crear publicación
/my-publications/edit/:id ... Editar publicación
```

### Rutas Administrativas (Requiere rol admin)
```
/admin ...................... Dashboard administrativo
/admin/users ................ Gestión de usuarios
/admin/posts ................ Gestión de publicaciones
/admin/categories ........... Gestión de categorías
/admin/subscriptions ........ Gestión de suscripciones
/admin/settings ............. Configuración
```

## 🔄 Flujo de Autenticación

### 1. Login Exitoso
```
Usuario ingresa credenciales
    ↓
Se llama a login({ email, password })
    ↓
Backend valida y retorna user + tokens
    ↓
Se guarda en Zustand store y localStorage
    ↓
PublicRoute detecta autenticación
    ↓
¿Es admin? → Redirige a /admin
¿Es usuario? → Redirige a /dashboard
```

### 2. Navegación con Sesión Activa
```
Usuario ya autenticado intenta acceder a /auth/login
    ↓
PublicRoute intercepta
    ↓
¿Es admin? → Redirige a /admin
¿Es usuario? → Redirige a /dashboard
```

### 3. Acceso a Ruta Protegida sin Autenticación
```
Usuario no autenticado intenta acceder a /admin o /dashboard
    ↓
AdminRoute o PrivateRoute intercepta
    ↓
Redirige a /auth/login
```

### 4. Usuario Regular Intenta Acceder a Admin
```
Usuario regular intenta acceder a /admin
    ↓
AdminRoute intercepta
    ↓
Verifica: isAdmin = false
    ↓
Redirige a / (homepage)
```

## 🎯 Hook de Autenticación

### `useAuth()` - Features
```typescript
const {
  user,              // Usuario actual
  isAuthenticated,   // Está autenticado?
  isAdmin,          // Es admin? (user?.role === 'admin')
  isUser,           // Es usuario regular? (user?.role === 'user')
  isLoading,        // Cargando?
  error,            // Error de autenticación
  login,            // Función login
  register,         // Función register
  logout,           // Función logout
  checkAuth         // Verificar autenticación
} = useAuth();
```

## 🛡️ Características de Seguridad

1. **Protección de Rutas**: Todas las rutas sensibles están protegidas por guards
2. **Redirección Automática**: Los usuarios son redirigidos según su rol automáticamente
3. **Verificación de Token**: Los tokens se verifican en cada request
4. **Refresh Token**: Sistema de refresh token para mantener sesión activa
5. **Persistencia**: El estado de autenticación persiste en localStorage
6. **Logout Seguro**: El logout limpia todos los datos de sesión

## 📱 Componentes de Navegación

### Header
- **Usuario No Autenticado**: Muestra icono de login
- **Usuario Autenticado**: Muestra avatar, nombre y botón de logout
- **Usuario Admin**: Además muestra enlace "Admin" para acceder al panel

### Sidebar Admin
- Solo visible en rutas `/admin/*`
- Navegación entre secciones administrativas
- Botón de logout con redirección a `/auth/login`
- Resalta la sección activa

## 🚀 Flujo Recomendado

### Para Usuarios Admin:
1. Login en `/auth/login`
2. Redirección automática a `/admin`
3. Navegación por las secciones administrativas
4. Acceso completo a todas las funcionalidades
5. Puede volver al sitio público con el logo o navegación

### Para Usuarios Regulares:
1. Login en `/auth/login`
2. Redirección automática a `/dashboard`
3. Navegación por sus áreas autorizadas
4. Sin acceso a `/admin` (redirige a `/` si intenta)

## 🔧 Configuración de Estado

### Zustand Store (AuthStore)
```typescript
{
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}
```

### LocalStorage Keys
- `access_token`: Token de acceso JWT
- `refresh_token`: Token de renovación
- `user_data`: Datos del usuario

## ✅ Checklist de Funcionalidades

- ✅ Protección de rutas por rol
- ✅ Redirección automática según rol
- ✅ Sistema de guards (PublicRoute, AdminRoute, PrivateRoute)
- ✅ Hook de autenticación completo
- ✅ Persistencia de sesión
- ✅ Refresh token automático
- ✅ Logout seguro con limpieza de datos
- ✅ Navegación admin funcional
- ✅ Sidebar con logout
- ✅ Header con detección de rol
- ✅ Compilación exitosa sin errores

## 🎨 Colores Restaurados

Se restauraron todos los colores originales de Guanacaste:
- ✅ `--gv-primary: #246083` (azul océano)
- ✅ `--gv-primary-600: #1b4b66` (azul oscuro)
- ✅ `--gv-primary-100: #eaf3f8` (azul claro)
- ✅ `--gv-accent: #c58a87` (terracota/coral)

Todos los componentes usan estos colores en lugar de Tailwind genéricos.
