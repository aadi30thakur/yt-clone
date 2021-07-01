import { AiFillEye } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
const SearchCard = ({ item }) => {
  console.log(item);

  return (
    <div className="w-1/4 px-10 my-10 overflow-hidden text-white sm:my-3 sm:px-3 md:my-6 md:px-6 md:w-1/3 lg:my-6 lg:px-6 lg:w-1/4 xl:my-8 xl:px-8 xl:w-1/4">
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
              src={item.snippet.thumbnails.high.url}
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
