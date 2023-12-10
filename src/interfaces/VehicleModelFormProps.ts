import VehicleModelForm from "../forms/vehicleModelForm";
import { VehicleMake } from "./VehicleMake";

export interface VehicleModelFormProps {
  modelForm: VehicleModelForm;
  makesData: VehicleMake[];
}
