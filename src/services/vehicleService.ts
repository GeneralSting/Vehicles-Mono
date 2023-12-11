import { VehicleMake } from "../interfaces/VehicleMake";
import { VehicleModel } from "../interfaces/VehicleModel";
import { ServiceActionMethod } from "../types/ServiceActionMethods";
import getErrorMessage from "../utils/getErrorMessage";

abstract class VehicleService {
  protected abstract vehiclePath: string;
  // default number of items that will be displayed in table content (pagination)
  protected pageSize: number;
  // base Firebase REST API url path
  protected readonly baseVehiclePath: string;

  constructor(pageSize: number = 5) {
    this.baseVehiclePath =
      "https://vehicle-mono-default-rtdb.europe-west1.firebasedatabase.app/Vehicles/";
    this.pageSize = pageSize;
  }

  public getPageSize = () => {
    return this.pageSize;
  };

  public setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  private async handleErrors<TVehicle>(
    response: Response
  ): Promise<TVehicle | null> {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const vehicleData = await response.json();
    if (vehicleData && vehicleData.error) {
      throw new Error(vehicleData.error);
    }

    return vehicleData as TVehicle;
  }

  // Every derived service will at the end call this function to fetch data
  protected async fetchVehicleData<TVehicle>(
    url: string
  ): Promise<TVehicle | null> {
    try {
      const response = await fetch(url);
      const vehicleData = await this.handleErrors(response);
      return vehicleData as TVehicle;
    } catch (error) {
      console.log(getErrorMessage(error, "Base service fetching data error"));
      throw new Error("Failed to fetch data");
    }
  }

  // Create, update and delete actions are executed through this function
  protected async actionVehicle(
    url: string,
    method: ServiceActionMethod,
    vehicleData: VehicleMake | VehicleModel | null = null
  ): Promise<Response> {
    const actionOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    };
    const actionRequest = new Request(url, actionOptions);
    const actionResponse = await fetch(actionRequest);
    if (method === "POST" && vehicleData) {
      const responseData = await actionResponse.json();
      const generatedId = responseData.name; // 'name' is the key property in Firebase

      // Update the data object with the generated ID
      vehicleData = { ...vehicleData, Id: generatedId };

      // PATCH request to update the object in the database with the generated ID
      const patchUrl = url.replace(".json", `/${generatedId}.json`);
      await this.actionVehicle(patchUrl, "PATCH", vehicleData);
    }
    return actionResponse;
  }
}

export default VehicleService;
