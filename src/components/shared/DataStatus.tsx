import React from "react";
import { DisplayErrorProps } from "../../interfaces/DataStatusProps";

// if there is value in provided errors, display them
const DataStatus: React.FC<DisplayErrorProps> = ({ errors }) => {
  const isErrors = errors.filter(
    (error) => error !== null && error !== "" && error !== undefined
  );

  if (isErrors.length > 0) {
    return (
      <div>
        {isErrors.map((error, index) => (
          <React.Fragment key={index}>
            <h1 className="centered-title">{error}</h1>
            {index < isErrors.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return <h1 className="centered-title">Error!</h1>;
};

export default DataStatus;
