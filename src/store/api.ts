import axios from "axios";
import { createEffect } from "./rootDomain";

const host = "https://rickandmortyapi.com/api/";

const getFx = createEffect<{ endpoint: string; query?: string }, any >(async ({ endpoint, query = '' }) => {
  try {
    let url = host;
    if (endpoint.startsWith(host)) {
      url = endpoint;
      console.log(url)
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
      error,
      "\n",
      "---------------------------"
    );
  }
});

const API = {
  get: getFx,
};

export default API;
