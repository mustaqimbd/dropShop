import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Search = ({ api, setSearchResults }) => {
  
  const [axiosSecure] = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosSecure.get(`${api}/search?q=${searchQuery}`);
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
    <input
      value={searchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      className="w-full p-2 rounded-md outline-[#83B735] border border-gray-300"
      type="text"
      placeholder="Search Customer..."
    />
  );
};

export default Search;
