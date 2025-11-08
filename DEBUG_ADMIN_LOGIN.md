# 🔧 Guía de Prueba - Login Admin

## 🚀 Servidor Corriendo

El servidor de desarrollo está corriendo en: **http://localhost:5174/**

## 🔍 Cambios Realizados

### 1. **Guards Actualizados con Loading States**

Todos los guards ahora manejan correctamente el estado de `isLoading`:

- ✅ **AdminRoute** - Muestra spinner mientras verifica permisos
- ✅ **PrivateRoute** - Muestra spinner mientras verifica autenticación  
- ✅ **PublicRoute** - Muestra spinner y redirige según rol

### 2. **Logs de Debug Agregados**

Los guards ahora imprimen en consola para ayudar a debug:
```javascript
// En la consola del navegador verás:
console.log('AdminRoute: Usuario es admin'); // Si tiene acceso
console.log('PublicRoute: Redirigiendo a /admin'); // Si es admin
```

### 3. **Rutas Corregidas**

- Login correcto: `/auth/login`
- Admin dashboard: `/admin`
- User dashboard: `/dashboard`

## 🧪 Cómo Probar

### Paso 1: Abrir la Aplicación
```
http://localhost:5174/
```

### Paso 2: Ir a Login
Navegar a: `http://localhost:5174/auth/login`

### Paso 3: Login con Usuario Admin
Ingresar credenciales de administrador (las que tengas configuradas en tu backend).

### Paso 4: Verificar Redirección
Después del login exitoso, deberías:
1. Ver mensaje en consola: "PublicRoute: Usuario admin autenticado, redirigiendo a /admin"
2. Ser redirigido automáticamente a `/admin`
3. Ver el panel administrativo con:
   - Sidebar a la izquierda
   - Banner superior con imagen
   - Dashboard con estadísticas

### Paso 5: Verificar Navegación Admin
Una vez en `/admin`, puedes navegar a:
- `/admin` - Dashboard principal
- `/admin/users` - Gestión de usuarios
- `/admin/posts` - Gestión de publicaciones
- `/admin/categories` - Gestión de categorías
- `/admin/subscriptions` - Gestión de suscripciones

## 🐛 Si No Funciona

### 1. Revisar Consola del Navegador (F12)
Buscar mensajes de:
- "AdminRoute: ..."
- "PublicRoute: ..."
- Errores de autenticación

### 2. Verificar Estado en Redux DevTools
Si tienes Redux DevTools instalado:
1. Abrir DevTools
2. Ir a tab "Redux"
3. Verificar estado de `AuthStore`:
   ```javascript
   {
     user: { ..., role: 'admin' },
     isAuthenticated: true,
     isLoading: false
   }
   ```

### 3. Verificar LocalStorage
En DevTools → Application → Local Storage:
- `access_token` debe existir
- `user_data` debe tener `role: 'admin'`

### 4. Verificar Network
En DevTools → Network:
- Request a `/api/auth/login` debe retornar 200
- Response debe incluir `user.role === 'admin'`

## 📝 Problemas Comunes

### "No me muestra ninguna vista"
**Causa**: El loading state se queda en `true`
**Solución**: Verificar que `checkAuth()` en el store se complete correctamente

### "Me redirige a homepage"
**Causa**: `isAdmin` retorna `false`
**Solución**: Verificar que el usuario tenga `role: 'admin'` en la respuesta del backend

### "Pantalla en blanco"
**Causa**: Error en algún componente
**Solución**: Revisar consola para errores de React

## 🎯 Verificación Rápida

Ejecuta en la consola del navegador (después de login):
```javascript
// Verificar estado de autenticación
const authState = JSON.parse(localStorage.getItem('user_data'));
console.log('User:', authState);
console.log('Is Admin?', authState?.role === 'admin');
```

## 📞 Siguiente Paso

Si después de esto sigue sin funcionar, por favor proporciona:
1. Screenshot de la consola del navegador
2. Screenshot de la pantalla que ves
3. Logs de Network tab (request de login)
4. Contenido de localStorage

¡Esto me ayudará a diagnosticar el problema exacto!
