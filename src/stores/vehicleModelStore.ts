import { computed, makeObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import VehicleStore from "./vehicleStore";
import VehicleModelService from "../services/vehicleModelService";
import { VehicleModel } from "../interfaces/VehicleModel";
import getTotalPages from "../utils/GetTotalPages";
import getErrorMessage from "../utils/GetErrorMessage";
import capitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { SortTypeInfo } from "../types/SortTypeInfo";
import StringIntoBoolean from "../utils/StringIntoBoolean";

export class VehicleModelStoreImpl extends VehicleStore {
  vehicleModelService = new VehicleModelService();
  totalModels: number | null = 0;
  modelsData: VehicleModel[] | null = null;
  // default value of pageSize is stored in service
  pageSize: number = this.vehicleModelService.getPageSize();
  currentPage: number = 1;
  // sort by key, true->ascending, false->descending
  sortType: string = "$key,true";
  searchedModels: string = "";

  constructor() {
    super();
    makeObservable(this, {
      totalModels: observable,
      modelsData: observable,
      pageSize: observable,
      currentPage: observable,
      sortType: observable,
      searchedModels: observable,
      totalPages: computed,
      modelsFirstId: computed,
      modelsLastId: computed,
    });

    this.setTotalModels();
  }

  public get totalPages() {
    return this.totalModels !== null
      ? getTotalPages(this.totalModels, this.pageSize)
      : 0;
  }

  // getting ID (Id or Name) from first model of displayed models
  // help to paginate next/previous models
  public get modelsFirstId() {
    const firstModel = this.modelsData?.slice(0, 1)[0];
    const sortTypeInfo = this.sortType.split(",");
    if (sortTypeInfo[0] === "$key") {
      // orderBy key
      return firstModel?.Id ?? "";
    } else {
      // orderBy Property Name value
      return firstModel?.Name ?? "";
    }
  }

  // getting ID (Id or Name) from last model of displayed models
  // help to paginate next/previous models
  public get modelsLastId() {
    const lastModel = this.modelsData?.slice(-1)[0];
    const sortTypeInfo = this.sortType.split(",");
    if (sortTypeInfo[0] === "$key") {
      // orderBy key
      return lastModel?.Id ?? "";
    } else {
      // orderBy Property Name value
      return lastModel?.Name ?? "";
    }
  }

  public getSearchedModels = async () => {
    const vehicleModels = await this.vehicleModelService.fetchSearchedModels(
      this.searchedModels
    );
    this.setModelsData(vehicleModels);
  };

  public setTotalModels = async () => {
    try {
      const totalModels = await this.vehicleModelService.fetchTotalModels();
      runInAction(() => {
        this.totalModels = totalModels;
      });
    } catch (error) {
      this.setStatus(getErrorMessage(error, "Fetching models error: "));
    }
  };

  private setModelsData = (apiData: VehicleModel[] | null) => {
    runInAction(() => {
      this.modelsData = apiData;
    });
  };

  public setPageSize = (pageSize: number) => {
    runInAction(() => {
      this.pageSize = pageSize;
    });
    this.vehicleModelService.setPageSize(pageSize);
  };

  public setCurrentPage = (currentPage: number) => {
    runInAction(() => {
      this.currentPage = currentPage;
    });
  };

  public setSortType = (sortType: string) => {
    runInAction(() => {
      this.sortType = sortType;
    });
  };

  public setSearchedModels = async (searchedModels: string) => {
    runInAction(() => {
      this.searchedModels = capitalizeFirstLetter(searchedModels);
    });
    this.searchedModels === ""
      ? this.getModels()
      : await this.getSearchedModels();
  };

  private getSortTypeInfo = (): SortTypeInfo => {
    const sortTypeParts: string[] = this.sortType.split(",");
    const sortTypeInfo: SortTypeInfo = [
      sortTypeParts[0],
      StringIntoBoolean(sortTypeParts[1]),
    ];
    return sortTypeInfo;
  };

  private updateCurrentPage(isNext: boolean | null) {
    this.setCurrentPage(
      isNext === null ? 1 : isNext ? this.currentPage + 1 : this.currentPage - 1
    );
  }

  public getModels = async (
    isNext: boolean | null = null,
    modelId: string | null = null
  ) => {
    try {
      this.setIsLoading(true);
      this.updateCurrentPage(isNext);
      const sortTypeInfo: SortTypeInfo = this.getSortTypeInfo();
      const vehicleModels = await this.vehicleModelService.fetchModels(
        sortTypeInfo[0],
        sortTypeInfo[1],
        isNext,
        modelId
      );
      this.setModelsData(vehicleModels);
      this.setIsLoading(false);
    } catch (error) {
      this.setStatus(getErrorMessage(error, "Fetching models error: "));
    }
  };

  // sorting by name and pagination are difficult if there are multiple identical names
  // that's why this check was created
  public checkEqualModel = async (
    searchedPropertyName: string,
    searchedPropertyValue: string
  ): Promise<boolean> => {
    try {
      const vehicleModel: VehicleModel[] | null =
        await this.vehicleModelService.fetchModelByProperty(
          searchedPropertyName,
          searchedPropertyValue
        );
      return vehicleModel?.length ? true : false;
    } catch (error) {
      this.setStatus(
        getErrorMessage(error, "Checking equal model property error: ")
      );
      return false;
    }
  };

  public createModel = async (newModel: VehicleModel): Promise<boolean> => {
    const response = await this.vehicleModelService.postModel(newModel);
    return response.status === 200 ? true : false;
  };
}

// store and share an instance of "VehicleModelStoreImpl"
export const VehicleModelStoreContext = createContext<VehicleModelStoreImpl>(
  new VehicleModelStoreImpl()
);

export const VehicleModelStore = new VehicleModelStoreImpl();
