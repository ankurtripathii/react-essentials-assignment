# React Essentials Assignment

**TuteDude · Module 2 · Vipin Kushwaha**

Two mini-projects covering all React Essentials concepts.

## 🚀 Live Demo

> Add your Netlify URL here after deployment

## 📦 Projects

### Part A — Portfolio Card Application
- Component structure & JSX
- Dynamic props (skill badges)
- Event handling (theme toggle, photo cycling, contact alert)
- State management (like counter)

### Part B — Movie Database Mini Application
- Search input with state
- Dynamic filtering logic
- Conditional rendering (empty / no results / results)
- Favourite toggle per movie
- Favourites section display

## 🛠 Setup

```bash
npm install
npm run dev       # development server
npm run build     # production build → dist/
```

## 📁 Structure

```
src/
  App.jsx       # All components (SkillBadge, PortfolioCard, MovieCard, MovieExplorer)
  App.css       # All styles
  index.css     # CSS variables (light/dark theme)
  main.jsx      # React entry point
index.html
netlify.toml    # Netlify build config
```

## Concepts Covered

| Concept | Where |
|---|---|
| JSX syntax | All components |
| Component architecture | SkillBadge, StatCard, MovieCard, etc. |
| Props | `skill` prop, `movie` prop, `isFav` prop |
| Event handling | onClick, onChange, alert |
| useState | likes, photoIndex, query, favourites, theme |
| Conditional rendering | search hint / no results / results / favs section |
| List rendering | SKILLS.map, MOVIES.map, filtered.map |
