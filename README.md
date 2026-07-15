# React E-commerce App

A small React + Vite e-commerce app for browsing and managing products.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the displayed local URL (for example `http://localhost:5173` or `http://localhost:5174`).

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build the production bundle
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint checks on the project

## Project structure

- `src/App.jsx` — app shell and route configuration
- `src/pages/Home.jsx` — product listing page
- `src/pages/ProductDetails.jsx` — single product detail page
- `src/pages/ProductForm.jsx` — product add/edit form
- `src/context/ProductContext.jsx` — React context provider for product data
- `src/context/productContextObject.js` — context helper and `useProducts` hook

## Key design & technical decisions

- **Vite + React**: chosen for fast local development and a lightweight project setup.
- **React Router v7**: used for page navigation and route-based views.
- **Context API**: central product state is shared via context so components can read and update products consistently.
- **Fake Store API**: initial product data is fetched from `https://fakestoreapi.com/products` on startup.
- **Local state management**: create, update, and delete operations are handled in memory so the app remains simple and easy to extend.
- **Tailwind CSS**: styling is implemented with Tailwind for responsive layout and consistent UI design.

## Notes

- Product changes are not persisted to a backend. Added or edited products exist only until the page is refreshed.
- To extend the app, add features such as search, filter by category, sorting, or backend persistence.
