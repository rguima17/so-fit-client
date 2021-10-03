function SearchBar(props) {
  return (
    
      <div className="max-w-3xl px-6 py-16 mx-auto text-center">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
          <input
            id="text"
            type="text"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Search"
          />
          <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Search Profiles
          </button>
        </div>
      </div>

  );
}

export default SearchBar;
