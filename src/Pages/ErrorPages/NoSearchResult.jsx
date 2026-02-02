import noSearch from "../../assets/NoSearch/NoSearch.png";
import filter from "../../assets/NoSearch/filter.png";

const NoSearchResult = ({ onResetFilters }) => {
  const handleReset = () => {
    console.log("Reset filters clicked from NoSearchResult");
    if (onResetFilters) {
      onResetFilters(); // This will call handleResetFilters from parent
    }
  };

  return (
    <div className="mt-10 space-y-5 flex flex-col items-center justify-center py-10">
      <img className="h-14 w-14" src={noSearch} alt="No Search Result" />
      <p className="text-[#EE2529] font-bold text-2xl md:text-3xl lg:text-4xl text-center">
        No Properties Match Your Filters
      </p>
      <p className="text-base lg:text-lg text-center max-w-2xl">
        We couldn't find any properties matching your current search criteria.
        Try adjusting your filters or broadening your search.
      </p>
      <div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 py-2.5 px-5 rounded-md text-white font-medium
            bg-gradient-to-r from-[#EE2529] to-[#C73834]
            hover:from-[#C73834] hover:to-[#EE2529] transition-all duration-300
            shadow-md hover:shadow-lg"
        >
          <img src={filter} alt="Filter icon" />
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default NoSearchResult;