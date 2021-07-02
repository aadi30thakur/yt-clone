import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import firebase from "../firebase/firebase";
const Auth = ({ setData }) => {
  const [checkData, setCheckData] = useState({});
  const authclick = async () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube");
    provider.addScope(
      "https://www.googleapis.com/auth/youtube.channel-memberships.creator"
    );
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
    provider.addScope("https://www.googleapis.com/auth/youtube.upload");
    provider.addScope("https://www.googleapis.com/auth/youtubepartner");
    provider.addScope(
      "https://www.googleapis.com/auth/youtubepartner-channel-audit"
    );
    const res = await auth.signInWithPopup(provider);
    setData(res);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("yt-res", JSON.stringify(res));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCheckData(sessionStorage.getItem("yt-res"));
    }
  }, []);

  return (
    <div>
      {checkData === null ? (
        <div className={"flex flex-col items-center justify-center h-screen "}>
          <button
            className={
              "flex flex-row p-5 bg-white border-2 border-white rounded-full"
            }
            onClick={authclick}
          >
            <span className="px-3">
              <FcGoogle className="w-6 h-6" />
            </span>
            Click to signin with google
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Auth;
