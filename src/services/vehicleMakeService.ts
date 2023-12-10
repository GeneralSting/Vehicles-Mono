import { VehicleMake } from "../interfaces/VehicleMake";
import VehicleService from "./vehicleService";

class VehicleMakeService extends VehicleService {
  protected vehiclePath: string;

  constructor() {
    super();
    this.vehiclePath = `${this.baseVehiclePath}VehicleMakes.json`;
  }

  // Get all "VehicleMakes"
  public fetchMakes = async (): Promise<VehicleMake[] | null> => {
    const vehicleMakes = await this.fetchVehicleData(this.vehiclePath);
    return vehicleMakes ? (Object.values(vehicleMakes) as VehicleMake[]) : null;
  };

  // Get all "VehicleMakes" sorted by "Abrv" property
  public fetchSortedMakes = async (): Promise<VehicleMake[] | null> => {
    const apiUrl = `${this.vehiclePath}?orderBy="Abrv"`;
    const vehicleMakes: VehicleMake[] | null = await this.fetchVehicleData(
      apiUrl
    );
    return vehicleMakes
      ? (Object.values(vehicleMakes).sort(
          (firstVehicleMake: VehicleMake, secondVehicleMake: VehicleMake) =>
            firstVehicleMake.Abrv.localeCompare(secondVehicleMake.Abrv)
        ) as VehicleMake[])
      : null;
    // docs: "Filtered data is returned unordered: When using the REST API,
    // the filtered results are returned in an undefined order since
    // JSON interpreters don't enforce any ordering. If the order of your data is important
    // you should sort the results in your application after they are returned from Firebase."
  };
}

export default VehicleMakeService;
