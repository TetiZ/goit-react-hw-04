export default function ImageCard(item) {
  return (
    <div>
      <img src={item.ulrs.small} alt={item.alt_description} />
    </div>
  );
}
