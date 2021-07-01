import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";

let Videos = [];
export default function Home() {
  // const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [token, setOauthAccessToken] = useState("");
  const [isTokenPresent, setIsTokenPresent] = useState(true);

  const fetchPopular = async () => {
    if (typeof window !== "undefined") {
      setOauthAccessToken(sessionStorage.getItem("yt-res"));
    }

    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;
    // console.log("HIT", token);
    setLoading(true);
    console.log(token);

    const res = await fetch(
      `${API}videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
    // console.log(data);
    const data = await res.json();
    setNextPage(data.nextPageToken);
    Videos = [...Videos, ...data.items];
    console.log(data);
    setLoading(false);
  };

  const fetchNextVideos = async () => {
    const {
      credential: { oauthAccessToken },
    } = JSON.parse(token);
    console.log(oauthAccessToken);

    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;
    console.log("HIT");
    const res = await fetch(
      `${API}videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&pageToken=${nextPage}&regionCode=IN&key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + oauthAccessToken,
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    Videos = [...Videos, ...data.items];
    setNextPage(data.nextPageToken);
    if (data.nextPageToken === undefined) {
      setIsTokenPresent(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="m-10">
      <Header />
      {loading === false ? (
        <InfiniteScroll
          dataLength={Videos.length}
          next={fetchNextVideos}
          hasMore={isTokenPresent}
          loader={<>lodaing data</>}
          endMessage={
            <p className="flex flex-row justify-center text-green-400">
              <b className="text-lg">Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-wrap -mx-10 overflow-hidden cursor-pointer sm:-mx-3 md:-mx-6 lg:-mx-6 xl:-mx-8">
            {Videos.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        "fetching data"
      )}
    </div>
  );
}
