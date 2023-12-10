import { makeObservable, observable, runInAction } from "mobx";
import { VehicleModel } from "../interfaces/VehicleModel";
import { createContext } from "react";
import getErrorMessage from "../utils/GetErrorMessage";
import VehicleStore from "./vehicleStore";
import VehicleModelService from "../services/vehicleModelService";

export class VehicleModelStoreImpl extends VehicleStore {
  vehicleModelService = new VehicleModelService();
  modelsData: VehicleModel[] | null = null;

  constructor() {
    super();
    makeObservable(this, {
      modelsData: observable,
    });
  }

  setVehicleModels = (apiData: VehicleModel[] | null) => {
    runInAction(() => {
      this.modelsData = apiData;
    });
  };

  public getModels = async () => {
    try {
      this.setIsLoading(true);
      const vehicleMakes = await this.vehicleModelService.fetchModels();
      this.setVehicleModels(vehicleMakes);
      this.setIsLoading(false);
    } catch (error) {
      this.setStatus(getErrorMessage(error, "Fetching makes error"));
    }
  };
}

// store and share an instance of "VehicleModelStoreImpl"
export const VehicleModelStoreContext = createContext<VehicleModelStoreImpl>(
  new VehicleModelStoreImpl()
);

export const VehicleModelStore = new VehicleModelStoreImpl();
