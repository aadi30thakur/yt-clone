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
    console.log(searchVal);

    fetchData(searchVal);
  }, []);
  const fetchData = async (query1) => {
    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;
    console.log(
      `${API}search?part=snippet&maxResults=25&q=${query1}&key=${API_KEY}`,
      query
    );

    const res = await fetch(
      `${API}search?part=snippet&maxResults=25&q=${query1}&key=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    setVideos([...videos, ...data.items]);
    console.log(videos);
    setnextToken(data.nextPageToken);
  };
  const fetchNextData = async () => {
    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;

    const res = await fetch(
      `${API}search?part=snippet&maxResults=25&pageToken=${nextToken}&q=${query}&key=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    setVideos([...videos, ...data.items]);
    console.log(videos);
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
        <div className="flex flex-wrap -mx-10 overflow-hidden cursor-pointer sm:-mx-3 md:-mx-6 lg:-mx-6 xl:-mx-8">
          {videos.map((item, key) => (
            <SearchCard item={item} key={key} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default list;
