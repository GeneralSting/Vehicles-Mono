import { observer } from "mobx-react";
import { useVehicleModelStore } from "../../hooks/useVehicleModelStore";

// sorting and pagination of models table content
const SortingOptions: React.FC = observer(() => {
  const vehicleModelStore = useVehicleModelStore();

  const updateTableContent = (
    isNext: boolean | null = null,
    modelId: string | null = null
  ) => {
    vehicleModelStore.setTotalModels();
    vehicleModelStore.getModels(isNext, modelId);
  };

  const handlePreviousClick = () => {
    updateTableContent(false, vehicleModelStore.modelsFirstId);
  };

  const handleNextClick = () => {
    updateTableContent(true, vehicleModelStore.modelsLastId);
  };

  const handlePageSizeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPageSize = parseInt(event.target.value, 10);
    vehicleModelStore.setPageSize(selectedPageSize);
    updateTableContent();
  };

  const handleSortType = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    vehicleModelStore.setSortType(event.target.value);
    updateTableContent();
  };

  return (
    <div className="pagination-container">
      <div className="pagination-row">
        <button
          onClick={handlePreviousClick}
          disabled={vehicleModelStore.currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>{`Page ${vehicleModelStore.currentPage} of ${vehicleModelStore.totalPages}`}</span>
        <button
          onClick={handleNextClick}
          disabled={
            vehicleModelStore.currentPage === vehicleModelStore.totalPages
          }
          className="pagination-button"
        >
          Next
        </button>
        <span>Total: {vehicleModelStore.totalModels}</span>
      </div>
      <div className="pagination-row">
        <label className="select-page-size">
          Page Size&nbsp;
          <select
            value={vehicleModelStore.pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
        <label className="select-sort-type">
          Sort By&nbsp;
          <select
            value={vehicleModelStore.sortType}
            onChange={handleSortType}
            disabled={vehicleModelStore.searchedModels ? true : false}
          >
            <option value="$key,true">Date Ascending</option>
            <option value="$key,false">Date Descending</option>
            <option value="Name,true">Name Ascending</option>
            <option value="Name,false">Name Descending</option>
          </select>
        </label>
      </div>
    </div>
  );
});

export default SortingOptions;
