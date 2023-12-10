import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  DataStatus,
  LoadingMessage,
  NoDataMessage,
} from "../../components/shared";
import { VehicleData } from "../../interfaces/VehicleData";
import mapVehicleData from "../../utils/MapVehicleData";
import { VehicleMakeStore } from "../../stores/vehicleMakeStore";
import { VehicleModelStore } from "../../stores/vehicleModelStore";
import VehicleModelsTable from "../../components/vehicleModels/VehicleModelsTable";

const Models = observer(() => {
  const vehicleMakeStore = VehicleMakeStore;
  const vehicleModelStore = VehicleModelStore;
  const [vehicleData, setVehicleData] = useState<VehicleData[] | null>(null);

  const fetchVehicleData = useCallback(async () => {
    await vehicleMakeStore.getMakes();
    await vehicleModelStore.getModels();
  }, [vehicleMakeStore, vehicleModelStore]);

  useEffect(() => {
    fetchVehicleData();
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
              <div className="row-table">
                {vehicleData !== null && vehicleData.length > 0 ? (
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
