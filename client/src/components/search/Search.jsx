import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TextField } from "@mui/material";

const Search = ({ api, setSearchResults }) => {
  const [axiosSecure] = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(null);
    }
  }, [searchQuery, setSearchResults]);

  const handleSearch = async () => {
    try {
      const response = await axiosSecure.get(`${api}?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.repeat) {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center relative">
      <TextField
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        id="outlined-search"
        label="Search field"
        type="search"
        className="w-full p-1 rounded-md outline-[#83B735] border border-gray-300"
        placeholder="Search..."
      />
      {!searchQuery && (
        <span className="absolute right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
              stroke="#191C1F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.7031 13.7031L17.5 17.5"
              stroke="#191C1F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default Search;
