import { VehicleData } from "../interfaces/VehicleData";
import { VehicleMake } from "../interfaces/VehicleMake";
import { VehicleModel } from "../interfaces/VehicleModel";

// goes through "makes" and "models", merges needed data into array of objects
const mapVehicleData = (
  makes: VehicleMake[] | null,
  models: VehicleModel[] | null
): VehicleData[] | null => {
  if (makes !== null && models !== null) {
    return models.map((model) => ({
      Id: model.Id,
      Name: model.Name,
      Abrv: model.Abrv,
      Make: {
        Id: model.MakeId,
        Name: makes.find((make) => make.Id === model.MakeId)?.Name || "",
        Abrv: makes.find((make) => make.Id === model.MakeId)?.Abrv || "",
      },
    }));
  }
  return null;
};

export default mapVehicleData;
