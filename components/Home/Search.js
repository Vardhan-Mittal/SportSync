// import React, { useState } from 'react'
// import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { useEffect } from "react";

// function Search() {
//     const [searchText,setSearchText]=useState();
//     const onSearchButtonClick=()=>{
//         console.log("Search Text:",searchText)
//     }
   


//     return (
//     <div className='mt-7'>
//         <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//     <div className="relative">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
//              stroke="currentColor" 
//              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path 
//                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
//         </div>
//         <input type="search" 
//         onChange={(text)=>setSearchText(text.target.value)}
//         id="default-search" className="block w-full p-4 pl-10 text-sm
//          text-gray-900 border 
//          border-gray-300 rounded-lg
//           bg-gray-50 focus:ring-blue-500
//            focus:border-blue-500 
//            dark:bg-gray-700
//             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
//             placeholder="Search with ZipCode" required/>
//         <button type="submit" onClick={()=>onSearchButtonClick()}
//          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//     </div>
//     </div>
//   )
// }

// export default Search


import React, { useState } from "react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./../../shared/FirebaseConfig";

export default function Search() {
  const [searchText, setSearchText] = useState("");  // Stores user input
  const [posts, setPosts] = useState([]);  // Stores fetched posts
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Stores errors
  const db = getFirestore(app);  // Firestore instance

  // 🔍 Function to search posts by Zip Code
  const onSearchButtonClick = async () => {
    if (!searchText.trim()) {
      setError("Please enter a Zip Code");
      return;
    }

    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const q = query(collection(db, "posts"), where("zip", "==", searchText));
      const querySnapshot = await getDocs(q);
      const results = [];

      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setPosts(results);
      if (results.length === 0) {
        setError("No posts found for this Zip Code.");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-7">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>

      <div className="relative">
        <input
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                     bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Search with Zip Code"
          required
        />
        <button
          type="submit"
          onClick={onSearchButtonClick}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                     focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                     text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Display Errors */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Loading State */}
      {loading && <p className="text-gray-500 mt-2">Loading...</p>}

      {/* Display Search Results */}
      <div className="mt-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white border border-gray-300 rounded-lg shadow-md mb-2">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.desc}</p>
            <p className="text-blue-500">{post.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
