import "tailwindcss/tailwind.css";
import Auth from "../components/Auth";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [data, setdata] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      setdata(sessionStorage.getItem("yt-res"));
    }
  }, []);
  return (
    <div>
      {data === null ? (
        <Auth setData={setdata} data={data} />
      ) : (
        <div>
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
