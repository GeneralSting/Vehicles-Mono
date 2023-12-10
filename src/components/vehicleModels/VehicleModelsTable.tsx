import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import VehicleModelsTableProps from "../../interfaces/VehicleModelsTableProps";
import alertMessage from "../../utils/AlertMessage";

const VehicleModelsTable: React.FC<VehicleModelsTableProps> = observer(
  ({ vehicleData }) => {
    const handleDelete = async (modelId: string) => {
      alertMessage("Delete model: " + modelId);
    };
    return (
      <>
        <table className="table-vehicle-models">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Model Abrv</th>
              <th>Make Name</th>
              <th>Make Abrv</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((model) => (
              <tr key={model.Id}>
                <td>
                  <Link className="model-name" to={model.Id}>
                    {model.Name}
                  </Link>
                </td>
                <td>{model.Abrv}</td>
                <td>{model.Make.Name}</td>
                <td>{model.Make.Abrv}</td>
                <td>
                  <button onClick={() => handleDelete(model.Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
);

export default VehicleModelsTable;
