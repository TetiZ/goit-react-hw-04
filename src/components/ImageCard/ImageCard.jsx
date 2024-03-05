export default function ImageCard({ item, onOpenModal }) {
  return (
    <div onClick={() => onOpenModal(item)}>
      <img src={item.urls.small} alt={item.alt_description} />
    </div>
  );
}
