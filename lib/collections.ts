import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ===== TYPES =====

export interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  order: number;
}

export interface Photo {
  id: string;
  title: string;
  collectionId: string;
  imageUrl: string;
  thumbnailUrl: string;
  description?: string;
  location?: string;
  dateTaken?: string;
  order: number;
  forSale: boolean;
  price?: number;
  printSizes?: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

// ===== COLLECTIONS =====

export async function getCollections(): Promise<CollectionItem[]> {
  const q = query(collection(db, 'collections'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CollectionItem[];
}

export async function getCollectionBySlug(slug: string): Promise<CollectionItem | null> {
  const q = query(collection(db, 'collections'), where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as CollectionItem;
}

// ===== PHOTOS =====

export async function getPhotosByCollection(collectionId: string): Promise<Photo[]> {
  const q = query(
    collection(db, 'photos'),
    where('collectionId', '==', collectionId),
    orderBy('order', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Photo[];
}

export async function getFeaturedPhotos(count: number = 6): Promise<Photo[]> {
  const q = query(collection(db, 'photos'), orderBy('order', 'asc'), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Photo[];
}

export async function getShopPhotos(): Promise<Photo[]> {
  const q = query(
    collection(db, 'photos'),
    where('forSale', '==', true),
    orderBy('order', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Photo[];
}

// ===== CONTACT =====

export async function submitContactForm(data: Omit<ContactSubmission, 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'contacts'), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}
