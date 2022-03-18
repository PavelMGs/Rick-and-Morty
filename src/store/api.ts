import axios from "axios";
import { createEffect, sample } from "./rootDomain";

const host = "https://rickandmortyapi.com/api/";

const getFx = createEffect<{ endpoint: string; query?: string }, any >(async ({ endpoint, query = '' }) => {
  try {
    let url = host;
    if (endpoint.startsWith(host)) {
      url = endpoint;
    } else {
      url += endpoint;
    }
    url += query;
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    console.log(
      "---------------------------",
      "\n",
      error.response.data.error,
      "\n",
      "---------------------------"
    );
    return error.response.data.error;
  }
});

sample({
  clock: getFx.failData,
  target: createEffect((failData) => {throw new Error(failData.response.data)})
})

const API = {
  get: getFx,
};

export default API;
