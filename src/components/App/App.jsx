import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { fetchImg } from "../../img-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";

export const App = () => {
  const [img, setImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  Modal.setAppElement("#root");

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getGallery() {
      try {
        const data = await fetchImg(query, page);
        setImg((prevImg) => [...prevImg, ...data]);
        setIsLoading(true);
        setError(false);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      getGallery();
    }
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImg([]);
  };

  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  const handleOpenModal = (value) => {
    setModalIsOpen(true);
    setModalContent(value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {img.length > 0 && (
        <ImageGallery items={img} onOpenModal={handleOpenModal} />
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred while fetching images.</p>}
      {img.length > 0 && !isLoading && (
        <button onClick={handleLoadMoreBtn}>Load More</button>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ImageModal content={modalContent} />
      </Modal>
      <Toaster position="top-right" />
    </>
  );
};
