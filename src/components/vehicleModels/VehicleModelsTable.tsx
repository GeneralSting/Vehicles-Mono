import { observer } from "mobx-react";
import VehicleModelsTableProps from "../../interfaces/VehicleModelsTableProps";

const VehicleModelsTable: React.FC<VehicleModelsTableProps> = observer(
  ({ vehicleData }) => {
    return (
      <>
        {vehicleData.map((model) => (
          <h2 key={model.Id}>{model.Name}</h2>
        ))}
      </>
    );
  }
);

export default VehicleModelsTable;
