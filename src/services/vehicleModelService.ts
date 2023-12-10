import { VehicleModel } from "../interfaces/VehicleModel";
import VehicleService from "./vehicleService";

class VehicleModelService extends VehicleService {
  protected vehiclePath: string;

  constructor() {
    super();
    this.vehiclePath = `${this.baseVehiclePath}VehicleModels.json`;
  }

  public async fetchTotalModels(): Promise<number | null> {
    // If the data snapshot at the location is a JSON object,
    // the values for each key will be truncated to true.
    // used for fetching number of objects without downloading everything
    const apiUrl = `${this.vehiclePath}?shallow=true`;
    const vehicleModelsShallow = await this.fetchVehicleData(apiUrl);
    return vehicleModelsShallow ? Object.keys(vehicleModelsShallow).length : 0;
  }

  public fetchModels = async (): Promise<VehicleModel[] | null> => {
    const vehicleMakes = await this.fetchVehicleData(this.vehiclePath);
    return vehicleMakes
      ? (Object.values(vehicleMakes) as VehicleModel[])
      : null;
  };

  // filtering -> model name search input
  public fetchSearchedModels = async (
    searchedModels: string
  ): Promise<VehicleModel[] | null> => {
    const apiUrl = `${this.vehiclePath}?orderBy="Name"&startAt="${searchedModels}"&endAt="${searchedModels}\uf8ff"`;
    const vehicleModels = await this.fetchVehicleData(apiUrl);
    return vehicleModels
      ? (Object.values(vehicleModels) as VehicleModel[])
      : null;
  };
}

export default VehicleModelService;
