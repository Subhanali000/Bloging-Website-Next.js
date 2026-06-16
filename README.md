# Blog Website — Next.js + TipTap Editor
#LINK https://bloging-website-next-js.vercel.app/dashboard

A modern full-stack blog platform built with **Next.js App Router** and a rich text editor powered by **TipTap**. Users can create, publish, and read blogs with formatted content and images in a clean responsive UI.

This project focuses on learning modern React architecture, server rendering, and rich text content management.

---

## Features

* Rich text blog editor (bold, italic, underline, colors, images)
* Upload or paste image URLs
* Blog preview cards on homepage
* Full blog reading page
* Search & filtering
* Dynamic routing
* In-memory API storage
* Clean responsive UI (Tailwind CSS)
* SSR-powered blog rendering
* SEO-optimized blog pages

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
│   ├── dashboard/page.tsx
│   ├── edit/{id}/page.tsx
│   └── layout.tsx
│   └── global.css
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

1. Go to the **Dashboard** page
2. Click **Create blog**
3. Enter title and author
4. Use the rich text editor
5. Upload or paste images
6. Click **Publish**
7. Blog appears on homepage

---

## API Endpoints

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

## Rendering Strategy (SSR Approach)

This project uses **Next.js App Router with Server Components** to enable efficient server-side rendering.

### Homepage

* Blog data is fetched on the server
* Server-rendered content improves performance
* Faster initial page load

### Blog Pages

Each blog page uses dynamic routing:

```
/blog/[id]
```

Blog content is rendered on the server to:

* Improve SEO
* Enable fast first contentful paint
* Reduce client-side JavaScript

### Client Components

Interactive features like:

* Search
* Editor
* UI interactions

are handled by client components for a smooth user experience.

---

## TipTap Editor Integration

The rich text editor is built using **TipTap**, a highly extensible headless editor.

### Editor Features

* Bold / italic / underline formatting
* Text colors
* Image embedding
* Rich HTML output

### How It Works

1. TipTap editor runs as a client component
2. Editor state is converted to HTML
3. HTML is stored in memory
4. Blog pages safely render formatted content

The editor is modular and can be extended with:

* Custom extensions
* Markdown support
* Media embeds

---

## SEO Strategy

SEO is implemented using built-in Next.js features.

### Dynamic Metadata

Each blog page generates metadata:

* Title
* Description
* Open Graph tags

### Server Rendering Benefits

* Search engines receive fully rendered HTML
* Faster indexing
* Improved discoverability

### Semantic Structure

* Proper heading hierarchy
* Accessible markup
* Clean URL structure

---

## Important Note (Storage)

This project currently uses **in-memory storage**:

* Data resets when server restarts
* Not persistent
* For development/testing only

For production, replace with:

* SQLite
* MongoDB
* Supabase
* PostgreSQL

---

## Scripts

```
npm run dev     # development server
npm run build   # production build
npm start       # start production server
```

---

## Future Improvements

* Persistent database integration
* User authentication
* Blog categories/tags
* Comments system
* SEO optimization enhancements
* Image upload storage (cloud)

---

##  Author

Built as a learning project using Next.js and TipTap.

---

## License

Free to use for learning and personal projects.
