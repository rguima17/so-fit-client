function Pagination(props) {
  return (
    <div className="flex items-center justify-end mb-4 mt-1">
      <button
        className="bg-gray-600 text-white hover:bg-white hover:text-black active:bg-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 rounded-l"
        onClick={() => {
          props.setCurrentPage(1);
          props.setPageChanged(true);
        }}
      >
        <i className="fas fa-angle-double-left"></i>
      </button>
      <button
        className="bg-gray-600 text-white hover:bg-white hover:text-black active:bg-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        onClick={() => {
          if (props.currentPage !== 1) {
            props.setCurrentPage(props.currentPage - 1);
            props.setPageChanged(true);
          }
        }}
      >
        <i className="fas fa-angle-left"></i>
      </button>
      <button
        className="bg-black text-white hover:bg-white hover:text-black active:bg-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        onClick={() => {
          props.setCurrentPage(props.currentPage);
          props.setPageChanged(true);
        }}
      >
        {props.currentPage}
      </button>
      <button
        className="bg-gray-600 text-white hover:bg-white hover:text-black active:bg-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        onClick={() => {
          props.setCurrentPage(props.currentPage + 1);
          props.setPageChanged(true);
        }}
      >
        {props.currentPage + 1}
      </button>
      <button
        className="bg-gray-600 text-white hover:bg-white hover:text-black active:bg-white font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        onClick={() => {
          props.setCurrentPage(props.currentPage + 2);
          props.setPageChanged(true);
        }}
      >
        {props.currentPage + 2}
      </button>
    </div>
  );
}

export default Pagination;
