export default function ImageModal({
  content: {
    likes,
    alt_description,
    links: download,
    urls: { regular },
  },
}) {
  return (
    <div>
      <img src={regular} alt={alt_description} />
      <p>Likes: {likes}</p>
      <a
        href={download}
        target="_blank"
        rel="noopener noreferrer"
        download={alt_description}
      >
        Download Image
      </a>
    </div>
  );
}
