import { makeObservable, observable, runInAction } from "mobx";
import { VehicleMake } from "../interfaces/VehicleMake";
import VehicleMakeService from "../services/vehicleMakeService";
import getErrorMessage from "../utils/GetErrorMessage";
import VehicleStore from "./vehicleStore";

export default class VehicleMakeStoreImpl extends VehicleStore {
  vehicleMakeService = new VehicleMakeService();
  makesData: VehicleMake[] | null = [];

  constructor() {
    super();

    makeObservable(this, {
      makesData: observable,
    });
  }

  setMakesData = (apiData: VehicleMake[] | null) => {
    runInAction(() => {
      this.makesData = apiData;
    });
  };

  public getMakes = async () => {
    try {
      this.setIsLoading(true);
      const vehicleMakes = await this.vehicleMakeService.fetchMakes();
      this.setMakesData(vehicleMakes);
      this.setIsLoading(false);
    } catch (error) {
      this.setStatus(getErrorMessage(error, "Fetching makes error"));
    }
  };
}

export const VehicleMakeStore = new VehicleMakeStoreImpl();
