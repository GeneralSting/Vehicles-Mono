import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import {
  DataStatus,
  LoadingMessage,
  NoDataMessage,
} from "../../components/shared";
import { VehicleMakeStore } from "../../stores/vehicleMakeStore";
import { useVehicleModelStore } from "../../hooks/useVehicleModelStore";
import { VehicleData } from "../../interfaces/VehicleData";
import mapVehicleData from "../../utils/MapVehicleData";
import VehicleModelsTable from "../../components/vehicleModels/VehicleModelsTable";

const Models = observer(() => {
  const vehicleMakeStore = VehicleMakeStore;
  const vehicleModelStore = useVehicleModelStore();
  const [vehicleData, setVehicleData] = useState<VehicleData[] | null>(null);

  const fetchVehicleData = useCallback(async () => {
    await vehicleMakeStore.getMakes();
    await vehicleModelStore.getModels();
  }, [vehicleMakeStore, vehicleModelStore]);

  const handleSearchModels = (event: ChangeEvent<HTMLInputElement>) => {
    vehicleModelStore.setSearchedModels(event.target.value);
  };

  useEffect(() => {
    vehicleModelStore.searchedModels !== ""
      ? vehicleModelStore.getSearchedModels()
      : fetchVehicleData();
  }, [fetchVehicleData, vehicleModelStore]);

  useEffect(() => {
    const convertedVehicleData = mapVehicleData(
      vehicleMakeStore.makesData,
      vehicleModelStore.modelsData
    );

    setVehicleData(convertedVehicleData);
  }, [vehicleMakeStore.makesData, vehicleModelStore.modelsData]);

  return (
    <>
      {vehicleMakeStore.status || vehicleModelStore.status ? (
        <DataStatus
          errors={[vehicleMakeStore.status, vehicleModelStore.status]}
        />
      ) : (
        <>
          {vehicleMakeStore.isLoading || vehicleModelStore.isLoading ? (
            <LoadingMessage />
          ) : (
            <div className="grid-container">
              <div className="row-title">
                <input
                  type="text"
                  placeholder="Model Name..."
                  autoFocus
                  value={vehicleModelStore.searchedModels}
                  onChange={handleSearchModels}
                />
                <h1>Models</h1>{" "}
                <Link className="btn-link-navigation" to={`new`}>
                  {" "}
                  <button className="btn-borderless">New Model</button>
                </Link>
              </div>
              <div className="row-table">
                {vehicleData !== null &&
                vehicleData.length > 0 &&
                vehicleModelStore.totalModels !== null ? (
                  <VehicleModelsTable vehicleData={vehicleData} />
                ) : (
                  <NoDataMessage />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
});

export default Models;
