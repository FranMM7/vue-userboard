
# vue-userboard

Frontend test assignment for ABZ Agency — built with Vue 3 + Vite + Tailwind CSS.

This app allows users to view a paginated list of registered users and submit a registration form via REST API (GET/POST). It was built based on the provided Figma mockups and OpenAPI specification.

## 🚀 Live Demo

👉 [Live deployed version](https://vue-userboard.vercel.app)  


## 📸 Screenshots



## 🛠 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [OpenAPI: ABZ Frontend Test API](https://openapi_apidocs.abz.dev/frontend-test-assignment-v1)

## 📦 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/franmm7/vue-userboard.git
cd vue-userboard

# Install dependencies
npm install

# Start development server
npm run dev
```

> ℹ️ Make sure you are using **Node.js 16+**

## 🌐 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=https://frontend-test-assignment-api.abz.agency/api/v1
```

## 📋 Features

- Pixel-perfect layout based on Figma
- Responsive design (mobile and desktop)
- Fetch and display users using `GET /users`
- Dynamic radio buttons from `GET /positions`
- File input handling for profile picture
- Form validation (required fields, email, phone)
- Submit form using `POST /users` with `Token`
- Auto-refresh user list after successful registration
- Smooth UX with loading indicators and feedback messages
- Prepared for deployment (Lighthouse optimized)

## 🧪 Tests

No formal unit tests were required for this task, but all interactions were manually tested across:

- Chrome, Firefox, Safari (macOS & iOS)
- Edge (Windows)
- Chrome (Android)

## 📦 Deployment

The app can be deployed to any static hosting:

### Option 1: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```


## ⏱ Time Spent

> Total hours:

Breakdown:
- Setup & Tailwind: 2h
- UI Layout: 6h
- GET API + Pagination: 
- Registration Form + POST API: 
- Error handling + Validation: 
- UX polish:
- Testing & optimization: 
- Deployment & docs: 1h
- Buffer/debugging:

## 😅 Challenges Faced

- Handling multipart/form-data and dynamic tokens on POST
- Pixel-perfect layout across different screen sizes
- Ensuring consistency with Figma and API requirements
- Matching photo preview with correct aspect ratio

## 👤 Author

- **Francis Mejía**  
  [LinkedIn](https://www.linkedin.com/in/mejiafrancised)  
  [GitHub](https://github.com/franmm7)

---

