// Home.js

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const Home = ({ user, handleLogout }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const userImageCollection = `images_${user.uid}`;

//   const fetchImages = async () => {
//     try {
//       const snapshot = await firebase.firestore().collection(userImageCollection).orderBy('timestamp', 'desc').get();
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log('Fetched Images:', data);
//       setImages(data);
//     } catch (error) {
//       console.error('Fetch Images Error:', error.message);
//     }
//   };
const fetchImages = async () => {
    try {
      console.log('Fetching Images for UID:', user.uid);
      const snapshot = await firebase.firestore().collection(userImageCollection).orderBy('timestamp', 'desc').get();
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched Images:', data);
      setImages(data);
    } catch (error) {
      console.error('Fetch Images Error:', error.message);
    }
  };
  
  

  const fetchInitialImages = async () => {
    // Fetch already uploaded images on component mount
    await fetchImages();
  };

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = firebase.firestore().collection(userImageCollection).orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setImages(data);
      });

    // Fetch already uploaded images on component mount
    fetchInitialImages();

    // Cleanup the subscription when component unmounts
    return () => unsubscribe();
  }, [user, userImageCollection]);

  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const storageRef = firebase.storage().ref(`/${userImageCollection}/${selectedImage.name}`);
        console.log("1")
        await storageRef.put(selectedImage);
        console.log("2")
        const downloadURL = await storageRef.getDownloadURL();
        console.log("3")
        await firebase.firestore().collection(userImageCollection).add({
          url: downloadURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // No need to manually fetch images, real-time update will trigger re-render
      } else {
        console.error('No image selected for upload');
      }
    } catch (error) {
      console.error('Image Upload Error:', error.message);
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <nav>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleImageUpload}>Upload Image</button>
        <button onClick={handleLogoutClick}>Logout</button>
      </nav>
      <div>
        <h2>Your Images</h2>
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              <img src={image.url} alt={`User Uploaded ${image.id}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
