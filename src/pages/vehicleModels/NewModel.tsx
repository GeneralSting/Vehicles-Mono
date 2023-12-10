import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo } from "react";
import LoadingMessage from "../../components/shared/LoadingMessage";
import { default as NewModelForm } from "../../components/shared/VehicleModelForm";
import DataStatus from "../../components/shared/DataStatus";
import VehicleModelForm from "../../forms/vehicleModelForm";
import { VehicleMakeStore } from "../../stores/vehicleMakeStore";

const NewModel = observer(() => {
  const vehicleMakeStore = VehicleMakeStore;
  const newModelForm = useMemo(() => new VehicleModelForm("create"), []);

  const fetchVehicleMakes = useCallback(async () => {
    await vehicleMakeStore.getSortedMakes();
  }, [vehicleMakeStore]);

  useEffect(() => {
    fetchVehicleMakes();
  }, [fetchVehicleMakes]);

  return (
    <>
      {vehicleMakeStore.status ? (
        <DataStatus errors={[vehicleMakeStore.status]} />
      ) : (
        <>
          {vehicleMakeStore.isLoading ? (
            <LoadingMessage />
          ) : (
            vehicleMakeStore.makesData !== null &&
            vehicleMakeStore.makesData.length && (
              <>
                <h1 className="centered-title">New Vehicle Model</h1>
                <NewModelForm
                  modelForm={newModelForm}
                  makesData={vehicleMakeStore.makesData}
                />
              </>
            )
          )}
        </>
      )}
    </>
  );
});

export default NewModel;
