// @flow

import { createApi } from "./base";
import { FormType } from "../types";
import { encodeForm } from "../encoders";
import { decodeForm } from "../decoders";

const createFormApi = function(apiKey: string) {
  const api = createApi("forms", apiKey);

  return {
    get: (id: number): Promise<FormType> => {
      return api.get(`${id}`).then(resp => decodeForm(resp.data));
    },
    findOrCreate: (form: FormType): Promise<FormType> => {
      return api
        .post("", { form: encodeForm(form) })
        .then(resp => decodeForm(resp.data));
    }
  };
};

export default createFormApi;
