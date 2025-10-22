# ALT-SCHOOL EXAM SUBMISSION
## A SIMPLE TODO APP THAT UTILIZES VUE 3 AND MODERN LIBRARIES TO DISPLAY TODO TASKS WITH PAGINATION AND OTHER BASIC FUNCTIONALITIES

## FEATURES
- Display of all todos
- Deleting of a todo task
- Updating a todo task
- Display of a single todo on a page
- Search for todos by title
- Pagination of todo data
- Filter by todo status

## INSTALLATION AND SETUP
- Vite was used in bootstrapping the Vue app
```bash
npm create vite@latest
```

- Tailwind installed


```shellscript
npm install tailwindcss @tailwindcss/vite
```

- Jsconfig file created at the root for absolute path feature. Usage:


```shellscript
import Button from '@/components/ui/Button.vue'
```

- Useful libraries installed with:


```shellscript
npm install 
```

## AVAILABLE SCRIPTS AND COMMANDS

- Run the app:


```shellscript
npm run dev
```

- Run local build


```shellscript
npm run build
```

- Preview production build


```shellscript
npm run preview
```

## TECHNOLOGY STACK AND ARCHITECTURAL DECISIONS

### TECHNOLOGY STACK

- Vue 3
- Tailwind CSS
- Shadcn Vue
- Vue Router
- TypeScript
- Lucide Vue Icons


### ARCHITECTURAL DECISIONS

- Views folder for separation of page components to be displayed on the web
- Assets folder for images and static files
- Custom composables housed in composables folder
- Router setup in router folder
- Tailwind for ease of styling
- Shadcn Vue and reusable components in components folder
- Reusable components in components/common folder for components that are used often across all pages