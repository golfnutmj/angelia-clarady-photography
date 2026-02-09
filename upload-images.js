require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const path = require('path');

// Firebase config from .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Images to upload
const images = [
  { local: '../hero-landscape.jpg', remote: 'photos/hero-landscape.jpg' },
  { local: '../gallery-mountains.jpg', remote: 'photos/gallery-mountains.jpg' },
  { local: '../gallery-forest.jpg', remote: 'photos/gallery-forest.jpg' },
  { local: '../gallery-coast.jpg', remote: 'photos/gallery-coast.jpg' },
  { local: '../about-portrait.jpg', remote: 'photos/about-portrait.jpg' },
];

async function uploadImages() {
  console.log('Starting image upload...\n');
  
  for (const img of images) {
    try {
      const localPath = path.join(__dirname, img.local);
      const fileBuffer = fs.readFileSync(localPath);
      const storageRef = ref(storage, img.remote);
      
      console.log(`Uploading ${img.local}...`);
      await uploadBytes(storageRef, fileBuffer, {
        contentType: 'image/jpeg',
      });
      
      const url = await getDownloadURL(storageRef);
      console.log(`✅ Uploaded: ${img.remote}`);
      console.log(`   URL: ${url}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${img.local}:`, error.message);
    }
  }
  
  console.log('Upload complete!');
}

uploadImages().catch(console.error);
