import React, { useState, useEffect } from 'react';// import React, { Component } from 'react';
import imagesApi from './Components/SearchApi';

import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Loader from 'react-loader-spinner';

import './App.css';

export default function App() {
  
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [pageImages, setPageImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalUrl, setModalUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    // modalUrl: ''

    useEffect(() => {
      if (!searchQuery) {
        return;
      }
      fetchImages();
    }, [searchQuery]);

    const onChangeQuery = (query) => {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
      setError(null);
    }
  
    const fetchImages = () => {
    
      const options = { searchQuery, page };
      setIsLoading(true);
 
  imagesApi
  .fetchImages(options)
  .then(images => {
    setImages(prevImages => [...prevImages, ...images]);
    setPage(p => p + 1);
    setPageImages([...images]);
    if (images.length === 0) {
      setError('Nothing was find by your query. Try again.');
    }})
  .catch(error => setError(error.message))
  .finally(() => setIsLoading(false));
};


  const toggleModal = () => {
      setShowModal (!showModal);
  }

  const onClickImageGalleryItem = (path) => {
     setModalUrl(path);
    toggleModal();
  }
  

    return (
      <>
        <Searchbar onChangeQuery={onChangeQuery} />
        {error && (
          <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>
            This is error: {error}
          </p>
        )}
        <ImageGallery images={images} onShowLargeImg ={onClickImageGalleryItem}/>
        { isLoading && <Loader type="Bars" color="#00BFFF" height={80} width={80} /> }       


          {images.length > 0 && !isLoading && (
          <Button title="Load More" onButtonClick={fetchImages} />
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalUrl} alt="" />
          </Modal>
        )}
      </>      
    )    
   
};

