import axios from "axios";
import { createEffect } from "./rootDomain";

const host = "https://rickandmortyapi.com/api/";

const getFx = createEffect<{ endpoint: string; query?: string }, any >(async ({ endpoint, query = '' }) => {
  try {
    const result = await axios.get(host + endpoint + query);
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
