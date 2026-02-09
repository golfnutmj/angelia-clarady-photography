# Angelia Clarady Photography — Next.js + Firebase + Vercel

A nature & landscape photography portfolio website built with Next.js 14 (App Router), Tailwind CSS, and Firebase.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Home page (hero, collections, about preview, CTA)
│   ├── globals.css         # Tailwind + custom styles
│   ├── portfolio/
│   │   └── page.tsx        # All collections grid
│   ├── about/
│   │   └── page.tsx        # Full bio page
│   ├── shop/
│   │   └── page.tsx        # Fine art prints for sale
│   └── contact/
│       └── page.tsx        # Contact form (submits to Firestore)
├── components/
│   ├── Navbar.tsx          # Fixed navigation with mobile menu
│   ├── Footer.tsx          # Brown footer with 3-column layout
│   └── Reveal.tsx          # Scroll-triggered animation wrapper
├── lib/
│   ├── firebase.ts         # Firebase client initialization
│   └── collections.ts      # Firestore queries (collections, photos, contact)
├── tailwind.config.ts      # Custom theme (colors, fonts)
├── .env.local.example      # Firebase env vars template
└── package.json
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Enable **Authentication** (Email/Password — for future admin panel)
3. Enable **Cloud Firestore** — create database in production mode
4. Enable **Storage** — for photo uploads
5. Go to Project Settings > General > Your apps > Add web app
6. Copy the config values

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Firebase credentials in `.env.local`.

### 4. Set up Firestore collections

Create these collections in Firestore Console:

**`collections`** — Photo collections/galleries
```
{
  name: "Ancient Forests",
  slug: "ancient-forests",
  description: "Light filtering through moss-draped canopies...",
  coverImage: "https://firebasestorage.googleapis.com/...",
  order: 1
}
```

**`photos`** — Individual photographs
```
{
  title: "Morning Mist Valley",
  collectionId: "<collection-doc-id>",
  imageUrl: "https://firebasestorage.googleapis.com/...",
  thumbnailUrl: "https://firebasestorage.googleapis.com/...",
  description: "Fog rolling through...",
  location: "Olympic National Park, WA",
  dateTaken: "2024-03-15",
  order: 1,
  forSale: true,
  price: 285,
  printSizes: ["12x18", "20x30", "30x45"]
}
```

**`contacts`** — Contact form submissions (auto-created by the form)

### 5. Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for collections and photos
    match /collections/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /photos/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Anyone can submit contact form, only admin can read
    match /contacts/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 6. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

### 7. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Angelia Clarady photography site"
git remote add origin https://github.com/YOUR_USERNAME/angelia-clarady-photography.git
git push -u origin main
```

### 8. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" → Import your GitHub repo
3. Add environment variables (same as `.env.local`)
4. Deploy — Vercel auto-detects Next.js

### 9. Custom domain (optional)

In Vercel dashboard:
1. Go to project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Replacing Placeholder Images

The current site uses CSS gradients as placeholders. To use real photos:

1. Upload images to Firebase Storage
2. Add photo documents to Firestore `photos` collection
3. Replace the gradient `<div>`s with Next.js `<Image>` components using the Firebase URLs

## Design System

- **Colors**: Cream/ivory backgrounds, copper accents, brown footer
- **Fonts**: Playfair Display (headings), Lato (body)
- **Style**: Warm, editorial, elegant — matching the original Lovable site design
