# Blog Website (Next.js + TipTap Editor)

A modern blog platform built with **Next.js App Router** and a rich text editor using **TipTap**. Users can create, publish, and read blogs with formatted content and images.

---

##  Features

* Rich text blog editor (bold, italic, underline, colors, images)
* Upload or paste image URLs
* Blog preview cards on homepage
* Full blog reading page
* Search & filtering
* Dynamic routing
* In-memory API storage
* Clean responsive UI (Tailwind CSS)

---

## Tech Stack

* Next.js 16 (App Router)
* React
* TypeScript
* Tailwind CSS
* TipTap Rich Text Editor
* Node.js API Routes

---

## Project Structure

```
blog-website/
│
├── app/
│   ├── api/
│   │   └── blogs/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   │
│   ├── blog/
│   │   └── [id]/page.tsx
│   │
│   ├── create/page.tsx
│   └── page.tsx
│
├── components/
│   ├── BlogCard.tsx
│   ├── BlogTable.tsx
│   ├── Editor.tsx
│   ├── footer.tsx
|   |── HomeClient.tsx
│   └── Navbar.tsx
│
├── lib/
│   └── store.ts
│
├── public/
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```
git clone <your-repo-url>
cd blog-website
```

### 2. Install dependencies

```
npm install
```

### 3. Run development server

```
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## How to Create a Blog

1. Go to the **Dasboard** page
2. Click on **Create blog** button
3. Write title and author
4. Use the rich text editor
5. Upload or paste images
6. Click **Publish**
7. Blog appears on homepage

---

## 🔌 API Endpoints

### Get all blogs

```
GET /api/blogs
```

### Get blog by ID

```
GET /api/blogs/:id
```

### Update blog

```
PUT /api/blogs/:id
```

### Delete blog

```
DELETE /api/blogs/:id
```

---

## Important Note (Storage)

This project currently uses **in-memory storage**:

* Data resets when server restarts
* Not persistent
* Only for development/testing

For production, replace with:

* SQLite
* MongoDB
* Supabase
* PostgreSQL

---

##  Scripts

```
npm run dev     # development server
npm run build   # production build
npm start       # start production server
```

---

##  Future Improvements

* Persistent database integration
* User authentication
* Blog categories/tags
* Comments system
* SEO optimization

---

##  Author

Built as a learning project using Next.js and TipTap.

---

## License

Free to use for learning and personal projects.
