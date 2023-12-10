import { VehicleModel } from "../interfaces/VehicleModel";
import VehicleService from "./vehicleService";

class VehicleModelService extends VehicleService {
  protected vehiclePath: string;
  private vehicleModelsPath: string;

  constructor() {
    super();
    this.vehiclePath = `${this.baseVehiclePath}VehicleModels.json`;
    this.vehicleModelsPath = `${this.baseVehiclePath}VehicleModels/`;
  }

  public async fetchTotalModels(): Promise<number | null> {
    // If the data snapshot at the location is a JSON object,
    // the values for each key will be truncated to true.
    // used for fetching number of objects without downloading everything
    const apiUrl = `${this.vehiclePath}?shallow=true`;
    const vehicleModelsShallow = await this.fetchVehicleData(apiUrl);
    return vehicleModelsShallow ? Object.keys(vehicleModelsShallow).length : 0;
  }

  private sortModels = (
    orderByValue: string,
    sortAscending: boolean,
    vehicleModels: VehicleModel[] | null
  ): VehicleModel[] | null => {
    if (!sortAscending) {
      // $key is needed value for orderBy when sorting by key
      if (orderByValue !== "$key") {
        // sorting by value of provided property name
        return vehicleModels
          ? (Object.values(vehicleModels).sort(
              (
                firstVehicleModel: VehicleModel,
                secondVehicleModel: VehicleModel
              ) => secondVehicleModel.Name.localeCompare(firstVehicleModel.Name)
            ) as VehicleModel[])
          : null;
      }
      return vehicleModels
        ? (Object.values(vehicleModels).reverse() as VehicleModel[])
        : null;
    }
    // $key is needed value for orderBy when sorting by key
    if (orderByValue !== "$key") {
      // sorting by value of provided property name
      return vehicleModels
        ? (Object.values(vehicleModels).sort(
            (
              firstVehicleModel: VehicleModel,
              secondVehicleModel: VehicleModel
            ) => firstVehicleModel.Name.localeCompare(secondVehicleModel.Name)
          ) as VehicleModel[])
        : null;
    }
    return vehicleModels
      ? (Object.values(vehicleModels) as VehicleModel[])
      : null;
  };

  public fetchModels = async (
    orderByValue: string,
    sortAscending: boolean,
    isNext: boolean | null,
    modelId: string | null
  ): Promise<VehicleModel[] | null> => {
    let apiUrl = `${this.vehiclePath}?orderBy="${orderByValue}"`;
    if (sortAscending) {
      if (isNext !== null) {
        // next or previous pagination button pressed
        apiUrl += isNext
          ? `&limitToFirst=${this.pageSize}&startAfter="${modelId}"`
          : `&limitToLast=${this.pageSize}&endBefore="${modelId}"`;
      } else {
        // default table content, none function parameters provided
        apiUrl += `&limitToFirst=${this.pageSize}`;
      }
    } else {
      if (isNext !== null) {
        // next or previous pagination button pressed
        apiUrl += isNext
          ? `&limitToLast=${this.pageSize}&endBefore="${modelId}"`
          : `&limitToFirst=${this.pageSize}&startAfter="${modelId}"`;
      } else {
        // default table content, none function parameters provided
        apiUrl += `&limitToLast=${this.pageSize}`;
      }
    }

    const vehicleModels: VehicleModel[] | null = await this.fetchVehicleData(
      apiUrl
    );
    return this.sortModels(orderByValue, sortAscending, vehicleModels);
    // docs: "Filtered data is returned unordered: When using the REST API,
    // the filtered results are returned in an undefined order since
    // JSON interpreters don't enforce any ordering. If the order of your data is important
    // you should sort the results in your application after they are returned from Firebase."
  };

  public fetchSingleModel = async (
    modelId: string
  ): Promise<VehicleModel | null> => {
    const apiUrl = `${this.vehicleModelsPath}${modelId}.json`;
    const vehicleModel = await this.fetchVehicleData(apiUrl);
    return vehicleModel ? (vehicleModel as VehicleModel) : null;
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

  // fetches model by provided model property and value
  // used for looking model with the same name
  public fetchModelByProperty = async (
    searchedProperty: string,
    searchedPropertyValue: string
  ): Promise<VehicleModel[] | null> => {
    const apiUrl = `${this.vehiclePath}?orderBy="${searchedProperty}"&equalTo="${searchedPropertyValue}"`;
    const vehicleModels = await this.fetchVehicleData(apiUrl);
    return vehicleModels
      ? (Object.values(vehicleModels) as VehicleModel[])
      : null;
  };

  public postModel = async (newModel: VehicleModel): Promise<Response> => {
    const apiUrl = `${this.vehicleModelsPath}.json`;
    const response = await this.actionVehicle(apiUrl, "POST", newModel);
    return response;
  };

  public patchModel = async (
    modelId: string,
    updatedModel: VehicleModel
  ): Promise<Response> => {
    const apiUrl = `${this.vehicleModelsPath}${modelId}.json`;
    const response = await this.actionVehicle(apiUrl, "PATCH", updatedModel);
    return response;
  };
}

export default VehicleModelService;
