// Used for YouTube embeds
export default function Embed({ block, className }) {
  return (
    <div className={`aspect-w-16 aspect-h-9 w-full`}>
      <iframe
        src={block.data.attrs.url}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
