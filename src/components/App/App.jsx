import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchImg } from "../../img-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export const App = () => {
  const [img, setImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const galleryRef = useRef();

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
    <div className={css.bg}>
      <SearchBar onSearch={handleSearch} />
      {img.length > 0 && (
        <ImageGallery
          ref={galleryRef}
          items={img}
          onOpenModal={handleOpenModal}
        />
      )}
      {isLoading && <Loader />}
      {error && <p>Error occurred while fetching images.</p>}
      {img.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMoreBtn} />
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ImageModal content={modalContent} />
      </Modal>
      <Toaster position="top-right" />
    </div>
  );
};
