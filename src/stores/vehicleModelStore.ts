import { makeObservable, observable, runInAction } from "mobx";
import { VehicleModel } from "../interfaces/VehicleModel";
import { createContext } from "react";
import getErrorMessage from "../utils/GetErrorMessage";
import VehicleStore from "./vehicleStore";
import VehicleModelService from "../services/vehicleModelService";
import capitalizeFirstLetter from "../utils/CapitalizeFirstLetter";

export class VehicleModelStoreImpl extends VehicleStore {
  vehicleModelService = new VehicleModelService();
  totalModels: number | null = 0;
  modelsData: VehicleModel[] | null = null;
  searchedModels: string = "";

  constructor() {
    super();
    makeObservable(this, {
      totalModels: observable,
      modelsData: observable,
      searchedModels: observable,
    });
  }

  public getSearchedModels = async () => {
    const vehicleModels = await this.vehicleModelService.fetchSearchedModels(
      this.searchedModels
    );
    this.setModelsData(vehicleModels);
  };

  public setSearchedModels = async (searchedModels: string) => {
    runInAction(() => {
      this.searchedModels = capitalizeFirstLetter(searchedModels);
    });
    this.searchedModels === ""
      ? this.getModels()
      : await this.getSearchedModels();
  };

  public setTotalModels = async () => {
    try {
      const totalModels = await this.vehicleModelService.fetchTotalModels();
      runInAction(() => {
        this.totalModels = totalModels;
      });
    } catch (error) {
      this.setStatus(getErrorMessage(error, "Fetching models error: "));
    }
  };

  setModelsData = (apiData: VehicleModel[] | null) => {
    runInAction(() => {
      this.modelsData = apiData;
    });
  };

  public getModels = async () => {
    try {
      this.setIsLoading(true);
      const vehicleMakes = await this.vehicleModelService.fetchModels();
      this.setModelsData(vehicleMakes);
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
