import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import Validator from "validatorjs";
import { VehicleModelFormOperation } from "../types/VehicleModelFormOperation";
import { VehicleModel } from "../interfaces/VehicleModel";
import validatorjs from "validatorjs";
import { VehicleModelFields } from "../interfaces/VehicleModelFields";

// Validator.getMessages(Validator.getDefaultLang()) return undefined, default lang is "en"
Validator.setMessages(Validator.getDefaultLang(), {
  required: "The :attribute field is required.",
  between: "The :attribute must be between :min and :max characters.",
  regex: "The :attribute requires capital letter or number as first letter",
});

export default class VehicleModelForm extends Form {
  private operation: VehicleModelFormOperation;
  constructor(
    operation: VehicleModelFormOperation,
    model?: VehicleModel // Make the model parameter optional
  ) {
    super();
    this.operation = operation;

    // model update form requires default & values field properties values
    if (model) {
      this.setInitialValues(model);
    }
  }

  private setInitialValues(initialValues: VehicleModel) {
    this.$("Name").set("value", initialValues.Name || "");
    this.$("Abrv").set("value", initialValues.Abrv || "");
    this.$("MakeId").set("value", initialValues.MakeId || "");
  }

  private async createModel() {}

  private async updateModel() {}

  /*--- form configuration --- */

  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }

  setup() {
    const fields: VehicleModelFields[] = [
      {
        name: "Name",
        label: "Model Name",
        placeholder: "Insert Model Name",
        rules: "required|between:1,25|regex:/^[A-Z0-9].*$/",
        value: "",
        autoFocus: true,
      },
      {
        name: "Abrv",
        label: "Model Abrv",
        placeholder: "Select Model Abrv",
        rules: "required",
        value: "",
        autoFocus: false,
      },
      {
        name: "MakeId",
        label: "Make Abrv",
        placeholder: "Select Make Abrv",
        rules: "required",
        value: "",
        autoFocus: false,
      },
    ];

    return {
      fields,
    };
  }

  hooks() {
    return {
      onSuccess(modelForm: VehicleModelForm) {
        modelForm.operation === "create" && modelForm.createModel();
        modelForm.operation === "update" && modelForm.updateModel();
      },

      onError(modelForm: VehicleModelForm) {
        console.log(modelForm.errors());
      },
    };
  }

  options() {
    return {
      validateOnChange: true,
      validateOnBlur: false,
    };
  }
}
