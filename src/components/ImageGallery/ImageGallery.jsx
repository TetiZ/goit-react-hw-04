import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items, onOpenModal }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard item={item} onOpenModal={onOpenModal} />
        </li>
      ))}
    </ul>
  );
}
