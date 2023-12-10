import { useContext } from "react";
import { VehicleModelStoreContext } from "../stores/vehicleModelStore";

// shared access to the store
export const useVehicleModelStore = () => {
  return useContext(VehicleModelStoreContext);
};
