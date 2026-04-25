📝 Ionic To-Do App - Prueba Técnica Mobile

Esta es una aplicación de lista de tareas (To-Do List) desarrollada con Ionic 8 y Angular 20, diseñada para demostrar habilidades en arquitectura híbrida, gestión de estado moderno con Signals, y configuración remota mediante Firebase.

🚀 Características Principales

Gestión de Tareas: Crear, completar y eliminar tareas.
Categorización Dinámica: Sistema completo de CRUD para categorías con personalización de colores.
Estado Reactivo: Implementación de Signals y computed para una reactividad eficiente y minimalista.
Firebase Remote Config: Feature Flag implementado para controlar la creación de categorías en tiempo real.
UI/UX Moderna: Estilizado con Tailwind CSS 4 para una interfaz limpia y responsiva.

🛠️ Stack Tecnológico
Framework: Ionic 8 + Angular 20
Lenguaje: TypeScript
Estilos: Tailwind CSS 4.0
Base de Datos/Config: Firebase & Remote Config
Nativo: Capacitor 8 (Preparado para Android/iOS)
Gestión de Estado: Angular Signals

📦 Instalación y Ejecución
Sigue estos pasos para ejecutar el proyecto localmente:

Clonar el repositorio:

Bash

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instalar dependencias:

Bash

npm install
Ejecución en Navegador:

Bash

ionic serve
📱 Compilación Nativa (Android & iOS)
Este proyecto utiliza Capacitor para la ejecución en dispositivos móviles:

Preparar el proyecto:

Bash

ionic build
Android:

Bash

npx cap add android
npx cap open android
iOS:

Bash

npx cap add ios
npx cap open ios


⚙️ Configuración de Firebase Remote Config
La aplicación incluye un servicio de configuración remota. El parámetro configurado es:

Key: can_create_categories

Tipo: Boolean

Función: Habilita o deshabilita el botón de "Añadir nueva categoría" en la vista de categorías sin necesidad de reinstalar la app.

⚡ Optimización de Rendimiento

Para cumplir con los estándares de alto rendimiento, se aplicaron las siguientes técnicas:

Angular Signals: Se reemplazó el uso de Observables tradicionales en la gestión de estado simple para reducir la carga de Zone.js y mejorar la detección de cambios localizados.

Control Flow Syntax (@for, @if): Uso de la nueva sintaxis de Angular para una renderización de listas más rápida y eficiente que *ngFor.

Estrategia OnPush: Minimización de ciclos de detección de cambios innecesarios.

Tailwind CSS 4: Optimización del bundle de estilos mediante el nuevo motor de PostCSS que reduce el tamaño del CSS final.

📄 Licencia
Este proyecto es para fines de evaluación técnica.

Desarrollado por: Jonnathan Alberto Zuleta Duque – Systems Engineer & Frontend Developer.
