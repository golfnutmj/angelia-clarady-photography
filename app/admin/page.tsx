'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  order: number;
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  
  // Collection states
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAddCollection, setShowAddCollection] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    slug: '',
    description: '',
    coverImage: '',
    order: 1,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        loadCollections();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const loadCollections = async () => {
    const snapshot = await getDocs(collection(db, 'collections'));
    const cols = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Collection[];
    setCollections(cols.sort((a, b) => a.order - b.order));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      try {
        setUploadProgress(`Uploading ${file.name}...`);
        const storageRef = ref(storage, `photos/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setUploadProgress(`✅ ${file.name} uploaded! URL: ${url}`);
      } catch (error: any) {
        setUploadProgress(`❌ Failed to upload ${file.name}: ${error.message}`);
      }
    }
    
    setUploading(false);
    setTimeout(() => setUploadProgress(''), 3000);
  };

  const handleAddCollection = async () => {
    if (!newCollection.name || !newCollection.slug) {
      alert('Name and slug are required');
      return;
    }
    
    try {
      await addDoc(collection(db, 'collections'), {
        name: newCollection.name,
        slug: newCollection.slug,
        description: newCollection.description,
        coverImage: newCollection.coverImage,
        order: newCollection.order,
      });
      
      setNewCollection({ name: '', slug: '', description: '', coverImage: '', order: 1 });
      setShowAddCollection(false);
      loadCollections();
    } catch (error: any) {
      alert('Failed to add collection: ' + error.message);
    }
  };

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    
    try {
      await deleteDoc(doc(db, 'collections', id));
      loadCollections();
    } catch (error: any) {
      alert('Failed to delete: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Upload Images</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploadProgress && (
            <p className="mt-4 text-sm text-gray-700">{uploadProgress}</p>
          )}
        </div>

        {/* Collections Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Collections</h2>
            <button
              onClick={() => setShowAddCollection(!showAddCollection)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              + Add Collection
            </button>
          </div>

          {/* Add Collection Form */}
          {showAddCollection && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-3">New Collection</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                  className="px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Slug (e.g., mountains)"
                  value={newCollection.slug}
                  onChange={(e) => setNewCollection({ ...newCollection, slug: e.target.value })}
                  className="px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                  className="px-3 py-2 border rounded col-span-2"
                />
                <input
                  type="text"
                  placeholder="Cover Image URL"
                  value={newCollection.coverImage}
                  onChange={(e) => setNewCollection({ ...newCollection, coverImage: e.target.value })}
                  className="px-3 py-2 border rounded col-span-2"
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={newCollection.order}
                  onChange={(e) => setNewCollection({ ...newCollection, order: parseInt(e.target.value) })}
                  className="px-3 py-2 border rounded"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleAddCollection}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Collection
                </button>
                <button
                  onClick={() => setShowAddCollection(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Collections List */}
          <div className="space-y-4">
            {collections.map((col) => (
              <div key={col.id} className="flex items-center gap-4 p-4 border rounded-lg">
                {col.coverImage && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={col.coverImage}
                      alt={col.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-bold">{col.name}</h3>
                  <p className="text-sm text-gray-600">{col.slug}</p>
                  <p className="text-sm text-gray-500">{col.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteCollection(col.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
