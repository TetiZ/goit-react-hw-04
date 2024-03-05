// import css from "./App.module.css";
// import clsx from "clsx";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { fetchImg } from "../../img-api";
import ImageGallery from "../ImageGallery/ImageGallery";

export const App = () => {
  const [img, setImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (newQuery) => {
    try {
      const data = await fetchImg(newQuery);
      setImg(data);
      setIsLoading(true);
      setError(false);
      setImg([]);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch}></SearchBar>
      {img.length > 0 && <ImageGallery items={img.results} />}
    </>
  );
};
