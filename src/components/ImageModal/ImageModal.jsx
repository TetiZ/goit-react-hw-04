import css from "./ImageModal.module.css";
import { LiaHandPointer } from "react-icons/lia";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  onClose,
  content: {
    likes,
    alt_description,
    urls: { regular, raw },
    breadcrumbs,
  },
}) {
  const tags = breadcrumbs.map((item) => item.slug).join(", ");

  return (
    <Modal
      className={css.content}
      overlayClassName={css.overlay}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <>
        <img className={css.img} src={regular} alt={alt_description} />
        <div className={css.info}>
          <p>Likes: {likes}</p>
          <p>Tags: {tags}</p>
          <a
            className={css.link}
            href={raw}
            download={`${alt_description}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiaHandPointer className={css.icon} />
            Raw image, ready to download
          </a>
        </div>
      </>
    </Modal>
  );
}
