# Vue Task Tracking Application

A task management application built with Vue.js that provides a grid and list view for tasks. The app allows users to search, view, edit, delete, and manage their tasks. It includes dynamic styling, reusable components, and responsive design.


## Features

- Dynamic Task Views: Toggle between grid and list layouts using PrimeVue's `DataView`.
- Search Functionality: Search tasks by title in real time.
- Task Management: Edit and delete tasks directly from the interface.
- Reusable Task Card Component: Customizable task cards using Vue's slot functionality.
- Dynamic Styling: Task status is color-coded (`To Do`, `In Progress`, `Completed`).
- Responsive Design: Designed to work seamlessly across devices.
- Overdue Task Highlighting: Tasks past their deadlines are visually highlighted.


## Technologies Used

### Frontend

- [Vue 3](https://vuejs.org/) - Reactive framework for building the user interface.
- [PrimeVue](https://primevue.org/) - Component library for UI elements.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [Vite](https://vitejs.dev/) - Build tool for modern web applications.

### Backend 

- Integration-ready for any backend API for task management.



# tasktracking

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
