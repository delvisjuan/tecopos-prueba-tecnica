# Tecopos - Prueba Técnica

Una aplicación moderna de gestión financiera construida con React, Tailwind CSS y Vite. Permite gestionar cuentas y operaciones con una interfaz intuitiva y responsiva.

## 🚀 Características

- **Gestión de Cuentas**: Crear, editar y eliminar cuentas financieras
- **Operaciones**: Registrar ingresos y gastos de una cuenta.
- **UI Moderna**: Diseño responsivo con componentes reutilizables
- **Autenticación**: Sistema de login simulado
- **Notificaciones**: Feedback visual para todas las acciones


## 🛠️ Tecnologías Utilizadas

- **React** - Framework principal
- **React Router DOM** - Navegación
- **Tailwind CSS** - Estilos y diseño
- **Lucide React** - Iconografía
- **Vite** - Build tool y desarrollo
- **MockAPI** - Simulación de API REST

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/delvisjuan/tecopos-prueba-tecnica.git
cd tecopos-prueba-tecnica
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Otros comandos útiles

```bash
# Construir para producción
npm run build

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

## 🌐 Despliegue

La aplicación está desplegada en Vercel y disponible en:

**URL**: [https://tecopos-prueba-tecnica-git-main-delvis-juans-projects.vercel.app/login](https://tecopos-prueba-tecnica-git-main-delvis-juans-projects.vercel.app/login)

## 📖 Uso de la Aplicación

### Gestión de Cuentas

- Crear nuevas cuentas con nombre, moneda y saldo inicial
- Editar información de cuentas existentes
- Ver lista de cuentas con información resumida
- Eliminar cuentas con confirmación

### Gestión de Operaciones

- Acceder a operaciones desde cada cuenta
- Crear ingresos y gastos
- Editar operaciones existentes
- Eliminar operaciones

### Navegación

- Página principal: Lista de cuentas (`/Accounts`)
- Operaciones de cuenta: `/Accounts/:accountId/operations`
- Navegación con botón de retroceso incluido

## 🔒 Seguridad

- Sistema de autenticación básico
- Protección de rutas privadas
- Validación de formularios

## 🎨 Diseño

- Diseño responsivo para móviles y escritorio
- Tema moderno con colores intuitivos
- Estados de carga con skeleton loaders
- Notificaciones toast para feedback

## 🔧 Configuración

La aplicación utiliza las siguientes herramientas de configuración:

- **Vite**: Configuración de build
- **Tailwind CSS**: Configuración de estilos

## 📄 Licencia

Este proyecto es para fines educativos y de prueba técnica.

---

## Desarrollado por Delvis Juan
