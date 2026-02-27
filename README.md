# RecetasFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# RecetasFront
# SmartChef Hub

Bienvenido al repositorio del **Frontend** de **SmartChef Hub**, una aplicación web moderna e intuitiva diseñada para amantes de la cocina. Esta plataforma permite a los usuarios buscar recetas de todo el mundo, descubrir cócteles, aprender sobre ingredientes y gestionar su propio recetario personal en la nube.

Este proyecto fue desarrollado utilizando las últimas características de **Angular (Standalone Components)**, con un enfoque en diseño limpio, experiencia de usuario (UX) fluida y consumo eficiente de múltiples APIs.

---

## Características Principales

1. **Buscador Inteligente Multilingüe**
   - Los usuarios pueden buscar ingredientes en **Español**. El sistema utiliza la API de Google Translate en segundo plano para traducir la búsqueda al inglés, consultar las bases de datos internacionales, y traducir los resultados (incluyendo instrucciones complejas) de vuelta al español.

2. **Integración de Múltiples APIs Gratuitas**
   - **TheMealDB:** Para obtener recetas de comida internacionales y sus instrucciones detalladas.
   - **TheCocktailDB:** Para sugerir bebidas y cócteles que combinen con el ingrediente buscado.
   - **Free Dictionary API:** Funciona como un "Mini Diccionario" integrado que define ingredientes poco comunes.

3. **Gestión de Recetas Propias (CRUD Completo)**
   - Conexión directa con un backend en **Flask** (Python) y base de datos **PostgreSQL** (Neon Tech) para Crear, Leer, Actualizar y Eliminar (CRUD) recetas personales.

4. **Diseño Moderno y Responsivo**
   - Interfaz construida con **CSS/SCSS puro**, utilizando *CSS Grid*, *Flexbox* y variables de diseño.
   - Efectos visuales atractivos: Fondos con degradados suaves (Gris perla y Rosa pastel), tarjetas flotantes (*hover effects*), ventanas emergentes (Modales) y animaciones de aparición (*fade-in*).

---

## Tecnologías Utilizadas

- **Framework:** Angular (Standalone Components, sin `ngModules`).
- **Lenguaje:** TypeScript, HTML5.
- **Estilos:** SCSS (Sass).
- **Peticiones HTTP:** `HttpClient` nativo de Angular, `RxJS` (Observables).
- **Enrutamiento:** `RouterOutlet` y `RouterLink` para navegación tipo SPA (Single Page Application).
