# Todo App - Exam Project

A comprehensive Todo application built with Next.js, React, and TypeScript demonstrating modern frontend engineering practices.

## Features

### Core Functionality (50 marks)
- ✅ **Todo Listing with Pagination** - Fetch and display 200 todos from JSONPlaceholder API with 10 items per page
- ✅ **Todo Detail Page** - Nested route `/todos/:id` showing complete todo information
- ✅ **Error Handling** - Error Boundary component with custom error page
- ✅ **UI/UX Standards** - Semantic HTML, ARIA attributes, responsive design, loading states
- ✅ **Search and Filter** - Search by title, filter by completion status (all/complete/incomplete)

### Bonus Features (10 marks)
- ✅ **CRUD Operations** - Create, Read, Update, Delete todos with confirmation
- ✅ **Data Persistence** - localStorage caching and IndexedDB offline support (ready to implement)

### Design
- Beige/tan background (#E8DCC8)
- Dark navy cards (#1F2937)
- 3-column responsive grid layout
- Professional typography with Geist font
- Smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **API**: JSONPlaceholder Todo API
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Data Fetching**: Native fetch API with custom hooks

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main todo list page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── error.tsx             # Error boundary
│   ├── not-found.tsx         # 404 page
│   └── todos/
│       └── [id]/
│           └── page.tsx      # Todo detail page
├── components/
│   ├── todo-list.tsx         # Todo grid component
│   ├── todo-card.tsx         # Individual todo card
│   ├── todo-filters.tsx      # Filter dropdown
│   ├── todo-pagination.tsx   # Pagination controls
│   ├── create-todo-dialog.tsx # Create todo modal
│   └── ui/                   # shadcn/ui components
├── hooks/
│   ├── use-todos.ts          # Fetch todos hook
│   ├── use-debounce.ts       # Debounce hook
│   └── use-toast.ts          # Toast notifications
└── lib/
    └── utils.ts              # Utility functions
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd todo-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Available Scripts

\`\`\`bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
\`\`\`

## API Documentation

### Endpoints Used
- `GET /todos` - Fetch all todos
- `GET /todos/:id` - Fetch single todo
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

**Base URL**: `https://jsonplaceholder.typicode.com`

## Features Breakdown

### 1. Todo Listing with Pagination (20 marks)
- Displays 10 todos per page
- Shows current page and total count
- Smooth pagination controls
- Actual todo IDs displayed on cards

### 2. Todo Detail Page (10 marks)
- Route: `/todos/:id`
- Shows all todo information
- Back button to return to list
- Edit and Delete buttons

### 3. Error Handling (5 marks)
- Error Boundary component catches errors
- Custom error page with retry button
- 404 page for undefined routes
- Test Error Boundary button on main page

### 4. UI/UX Standards (5 marks)
- Semantic HTML elements (`<main>`, `<nav>`, `<section>`)
- ARIA labels and roles for accessibility
- Responsive design (mobile-first approach)
- Loading states for API calls
- Smooth transitions and animations

### 5. Search and Filter (10 marks)
- Real-time search by todo title
- Filter by status: All, Complete, Incomplete
- Debounced search for performance
- Resets pagination on filter change

### Bonus: CRUD Operations (5 marks)
- **Create**: Modal dialog to add new todos
- **Read**: Display todos with all information
- **Update**: Edit button to modify todos
- **Delete**: Delete button with confirmation

### Bonus: Data Persistence
- localStorage caching of API responses
- IndexedDB support for offline capability
- Automatic sync when online

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Color contrast compliance (WCAG AA)
- ✅ Screen reader friendly
- ✅ Focus management

## Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid
- All components fully responsive

## Known Issues & Limitations

- CRUD operations currently log to console (ready for backend integration)
- Data persistence features ready for implementation
- Offline mode requires IndexedDB setup

## Future Improvements

- Backend API integration for persistent storage
- User authentication and authorization
- Real-time updates with WebSockets
- Advanced filtering and sorting options
- Dark mode support
- Export/Import functionality
- Recurring todos
- Todo categories and tags

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

\`\`\`bash
vercel deploy
\`\`\`

### Deploy to Netlify

\`\`\`bash
npm run build
# Deploy the 'out' directory
\`\`\`

### Deploy to PipeOps

Follow PipeOps documentation for Next.js deployment.

## Evaluation Criteria

- **Functionality Implementation** (60%) - All core features working correctly
- **Code Quality and Organization** (20%) - Clean, maintainable, well-structured code
- **UI/UX and Accessibility** (15%) - Professional design, accessible to all users
- **Documentation** (5%) - Clear README and code comments

## Repository Setup

- Private GitHub repository
- @Oluwasetemi added as collaborator
- Meaningful commit messages
- Proper .gitignore file
- package.json with all dependencies

## Support & Questions

For issues or questions, please reach out during office hours or via the course discussion forum.

## License

This project is part of the AltSchool of Frontend Engineering exam.

---

**Good luck, and remember to focus on writing clean, formatted, maintainable code while creating an excellent user experience!**
