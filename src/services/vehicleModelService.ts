import { VehicleModel } from "../interfaces/VehicleModel";
import VehicleService from "./vehicleService";

class VehicleModelService extends VehicleService {
  protected vehiclePath: string;

  constructor() {
    super();
    this.vehiclePath = `${this.baseVehiclePath}VehicleModels.json`;
  }

  public fetchModels = async (
  ): Promise<VehicleModel[] | null> => {
    const vehicleMakes = await this.fetchVehicleData(this.vehiclePath);
    return vehicleMakes ? (Object.values(vehicleMakes) as VehicleModel[]) : null;
  };
}

export default VehicleModelService;
