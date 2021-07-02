import { AiFillEye } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
const Card = ({ item }) => {
  return (
    <div className="flex justify-center p-6 text-6xl text-white rounded-xl ">
      <Link
        href={{
          pathname: `/video`,
          query: { data: item.id },
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
            <span className="flex flex-row">
              <AiFillEye className="w-4 h-4 pt-1" />
              <p className="text-sm">{item.statistics.viewCount}</p>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
