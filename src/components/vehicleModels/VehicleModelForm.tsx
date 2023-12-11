import React from "react";
import { observer } from "mobx-react-lite";
import { VehicleModelFormProps } from "../../interfaces/VehicleModelFormProps";

const VehicleModelForm: React.FC<VehicleModelFormProps> = observer(
  ({ modelForm, makesData }) => {
    return (
      <form onSubmit={modelForm.onSubmit}>
        <div>
          <label htmlFor={modelForm.$("Name").id}>
            {modelForm.$("Name").label}
          </label>
          <input {...modelForm.$("Name").bind()} />
          <p className="form-error">{modelForm.$("Name").error}</p>
        </div>

        <div>
          <label htmlFor={modelForm.$("Abrv").id}>
            {modelForm.$("Abrv").label}
          </label>
          <select {...modelForm.$("Abrv").bind()}>
            <option disabled value="">
              {modelForm.$("Abrv").placeholder}
            </option>
            {makesData.map((make) => (
              <option key={make.Id} value={make.Abrv}>
                {make.Abrv}
              </option>
            ))}
          </select>
          <p className="form-error">{modelForm.$("Abrv").error}</p>
        </div>

        <div>
          <label htmlFor={modelForm.$("MakeId").id}>
            {modelForm.$("MakeId").label}
          </label>
          <select {...modelForm.$("MakeId").bind()}>
            <option disabled value="">
              {modelForm.$("MakeId").placeholder}
            </option>
            {makesData.map((make) => (
              <option key={make.Id} value={make.Id}>
                {make.Abrv}
              </option>
            ))}
          </select>
          <p className="form-error">{modelForm.$("MakeId").error}</p>
        </div>

        <div className="button-row">
          <button className="btn-borderless submit-form" type="submit">
            Submit
          </button>
          <button
            className="btn-borderless reset-form"
            type="button"
            onClick={modelForm.onReset}
          >
            Reset
          </button>
        </div>

        <p>{modelForm.error}</p>
      </form>
    );
  }
);

export default VehicleModelForm;
