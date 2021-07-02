import Link from "next/link";
import Image from "next/image";
const SearchCard = ({ item }) => {
  return (
    <div className="flex justify-center p-6 text-6xl text-white rounded-xl">
      <Link
        href={{
          pathname: `/video`,
          query: { data: item.id.videoId },
        }}
        key={item.id}
      >
        <div>
          <div>
            <Image
              className="rounded-lg "
              width={300}
              height={200}
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
          </div>
          <div>
            <h5 className="text-lg">{item.snippet.title}</h5>
            <p className="text-sm">{item.snippet.channelTitle}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchCard;
