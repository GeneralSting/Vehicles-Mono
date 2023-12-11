import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/shared/LoadingMessage";
import { VehicleModelForm as UpdateModelForm } from "../../components/vehicleModels/";
import DataStatus from "../../components/shared/DataStatus";
import { observer } from "mobx-react";
import { VehicleMakeStore } from "../../stores/vehicleMakeStore";
import { VehicleModelStore } from "../../stores/vehicleModelStore";
import VehicleModelForm from "../../forms/vehicleModelForm";

const EditModel = observer(() => {
  const { modelId } = useParams();
  const vehicleMakeStore = VehicleMakeStore;
  const vehicleModelStore = VehicleModelStore;
  const [updateModelForm, setUpdateModelForm] =
    useState<VehicleModelForm | null>(null);

  const fetchVehicleData = useCallback(async () => {
    await vehicleMakeStore.getSortedMakes();
    const singleVehicleModel = await vehicleModelStore.getSingleModel(modelId);
    if (singleVehicleModel) {
      // Create model form object when data is fetched
      const updateModelForm = new VehicleModelForm(
        "update",
        singleVehicleModel
      );
      setUpdateModelForm(updateModelForm);
    }
  }, [modelId, vehicleMakeStore, vehicleModelStore]);

  useEffect(() => {
    fetchVehicleData();
  }, [fetchVehicleData]);

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
            vehicleMakeStore.makesData !== null &&
            vehicleMakeStore.makesData.length && (
              <>
                {updateModelForm ? (
                  <>
                    <h1 className="centered-title">Update Vehicle Model</h1>
                    <UpdateModelForm
                      modelForm={updateModelForm}
                      makesData={vehicleMakeStore.makesData}
                    />
                  </>
                ) : (
                  <h1 className="centered-title">
                    Cannot find model with ID: {modelId}
                  </h1>
                )}
              </>
            )
          )}
        </>
      )}
    </>
  );
});

export default EditModel;
