import Link from "next/link";
import { useEffect, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-row justify-center">
      <input
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="p-2 px-4 text-sm bg-white w-96 focus:outline-none"
      />
      <Link href={{ pathname: `/list`, query: { searchVal: keyword } }}>
        <button className="p-2 px-4 text-gray-400 bg-gray-600">
          <BiSearchAlt className=" h-7 w-7" />
        </button>
      </Link>
    </div>
  );
};

export default Header;
