import { AUTH_KEY } from "@/constants/locales";
import globalAxios from "axios";

export const getAPIEndpointGraphql = (): string => {
  if (process.env.NODE_ENV !== "production") {
    return  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string
  } else {
    return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_LIVE as string;
  }
};

export const getAPIEndpointRestApi = (): string => {
  if (process.env.NODE_ENV !== "production") {
    return process.env.NEXT_PUBLIC_RESTAPI_ENDPOINT as string;
  } else {
    return process.env.NEXT_PUBLIC_RESTAPI_ENDPOINT_LIVE as string;
  }
};

const axiosGraphQLInstance = globalAxios.create({
  baseURL: getAPIEndpointGraphql(),
});

export function axiosGraphQL<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {

    const { data: response } = await axiosGraphQLInstance.post(
      "",
      {
        query,
        variables,
      }
    );

    const { data, errors } = response;

    if (errors) {
      throw errors;
    }

    return data;
  };
}
axiosGraphQLInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(AUTH_KEY);

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


const axiosRestApi = globalAxios.create({
  baseURL: getAPIEndpointRestApi(),
});

export default axiosRestApi;

