import { useEffect, useState } from "react";

const video = () => {
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
  const [VidId, setVidId] = useState();
  useEffect(() => {
    const { data } = getQueryParams(window.location.search);
    setVidId(data);
  }, []);
  console.log(`https://www.youtube.com/watch?v=${VidId}`);

  return (
    <div>
      <iframe
        className="w-screen h-screen"
        src={`https://www.youtube.com/embed/${VidId}`}
      ></iframe>
    </div>
  );
};

export default video;
