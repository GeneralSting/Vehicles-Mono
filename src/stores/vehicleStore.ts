import { makeObservable, observable, runInAction } from "mobx";

abstract class VehicleStore {
  // display loading message while data is fetching
  isLoading: boolean;
  // possible errors
  status: string | null = null;

  constructor() {
    this.isLoading = true;
    this.status = "";

    makeObservable(this, {
      isLoading: observable,
      status: observable,
    });
  }

  setIsLoading(isLoading: boolean) {
    runInAction(() => {
      this.isLoading = isLoading;
    });
  }

  setStatus(status: string) {
    runInAction(() => {
      this.status = status;
    });
  }
}

export default VehicleStore;
