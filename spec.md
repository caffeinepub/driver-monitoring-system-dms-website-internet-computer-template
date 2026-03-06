# Student Study Resource Hub

## Current State
The project currently has a Driver Monitoring System website from a previous build. The backend and frontend need to be fully replaced to serve a new purpose.

## Requested Changes (Diff)

### Add
- **Resource categories**: Programming Notes, Useful Websites, Coding Practice Links, Free Courses
- **Search functionality**: Full-text search across all resources by title, description, and tags
- **Bookmark feature**: Users can bookmark/unbookmark resources, persisted in backend
- **Downloadable notes**: Resources can have a download URL for PDFs/notes
- **Dark/light mode toggle**: Persisted preference
- **Contact/suggestion form**: Users submit new resource suggestions (stored in backend)
- **Navigation bar**: Sticky nav with category filters, search bar, and dark mode toggle
- **Resource cards**: Display title, description, category badge, tags, bookmark button, and optional download button
- **Sample seed data**: Pre-populated resources for each category

### Modify
- Backend: Replace DMS logic with resource management and suggestion submission APIs
- Frontend: Completely replace DMS UI with student-friendly resource hub UI

### Remove
- All Driver Monitoring System UI, logic, and backend code

## Implementation Plan
1. Generate Motoko backend with:
   - `Resource` type: id, title, description, url, category (enum), tags, downloadUrl (optional), createdAt
   - `Suggestion` type: id, name, email, resourceTitle, resourceUrl, message, createdAt
   - CRUD: getResources, getResourcesByCategory, searchResources, bookmarkResource, getBookmarks
   - Suggestions: submitSuggestion, getSuggestions (admin)
   - Seed data for all 4 categories
2. Build React frontend with:
   - Sticky navbar with logo, category tabs, search input, dark/light toggle
   - Hero section with tagline and search bar
   - Resource grid with cards (title, description, category badge, tags, bookmark icon, external link, download button if available)
   - Category filter tabs: All, Programming Notes, Useful Websites, Coding Practice, Free Courses
   - Bookmarks page/section (filtered view)
   - Contact/suggestion form modal or section
   - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
