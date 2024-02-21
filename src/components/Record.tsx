type RecordProps = {
  albumId: string;
  title: string;
  imageUrl: string;
};

export default function Record({ albumId, title, imageUrl }: RecordProps) {

  return (
    <div className="relative mr-32 shadow-xl w-72 md:w-auto c-record">
      <img
        src={imageUrl}
        alt={title}
        width="400"
        height="400"
        className="relative z-10 block bg-white rounded-md tag-album-cover c-record--album"
      />
    </div>
  );
}
