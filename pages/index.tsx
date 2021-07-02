import { useEffect, useState } from "react";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";
import Head from "next/head";
export default function Home() {
  const [videos, setVideos] = useState([]);
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
    setLoading(true);
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
    const data = await res.json();
    setNextPage(data.nextPageToken);
    setVideos([...videos, ...data.items]);
    setLoading(false);
  };
  const fetchNextVideos = async () => {
    const {
      credential: { oauthAccessToken },
    } = JSON.parse(token);
    const API = process.env.NEXT_PUBLIC_YOUTUE_API;
    const API_KEY = process.env.NEXT_PUBLIC_GCP_YOUTUBE_APIKEY;
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
    setVideos([...videos, ...data.items]);
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
      <Head>
        <title>u-tube</title>
        <meta
          name="description"
          content="a basic youtube which is not throwing ads "
        />
      </Head>
      <Header />
      {loading === false ? (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchNextVideos}
          hasMore={isTokenPresent}
          loader={<>lodaing data</>}
          endMessage={
            <p className="flex flex-row justify-center text-green-400">
              <b className="text-lg">Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="mx-auto ">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {videos.map((item) => (
                <Card item={item} key={item.id} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        "fetching data"
      )}
    </div>
  );
}
