import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCard from "../components/SearchCard";
const list = () => {
  const getQueryParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };
  const [query, setquery] = useState("");
  const [videos, setVideos] = useState([]);
  const [hasnextToken, setHasnextToken] = useState(true);
  const [nextToken, setnextToken] = useState("");
  useEffect(() => {
    const { searchVal } = getQueryParams(window.location.search);
    setquery(searchVal);
    fetchData(searchVal);
  }, []);
  const fetchData = async (query1) => {
    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;
    const res = await fetch(
      `${API}search?part=snippet&maxResults=25&q=${query1}&key=${API_KEY}`
    );
    const data = await res.json();
    setVideos([...videos, ...data.items]);
    setnextToken(data.nextPageToken);
  };
  const fetchNextData = async () => {
    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;
    const res = await fetch(
      `${API}search?part=snippet&maxResults=25&pageToken=${nextToken}&q=${query}&key=${API_KEY}`
    );
    const data = await res.json();
    setVideos([...videos, ...data.items]);
    setnextToken(data.nextPageToken);
    if (data.nextPageToken === undefined) {
      setHasnextToken(false);
    }
  };

  return (
    <div className="flex flex-row justify-center text-white ">
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchNextData}
        hasMore={hasnextToken}
        loader={<>lodaing data</>}
        endMessage={
          <p className="flex flex-row justify-center text-green-400">
            <b className="text-lg">Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {videos.map((item, key) => (
              <SearchCard item={item} key={key} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default list;
