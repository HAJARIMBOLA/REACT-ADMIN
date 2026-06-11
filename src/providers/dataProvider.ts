import type { DataProvider } from "react-admin";
import { getAxiosInstance } from "./httpClient";

/**
 * Custom data provider.
 *
 * Talks to the backend through getAxiosInstance(), which:
 *  - prefixes every call with VITE_API_URL
 *  - attaches the JWT bearer token automatically
 *  - clears the session on 401
 *
 * REST conventions (json-server compatible, also work with most
 * Spring Boot / NestJS setups that support these query params):
 *   GET    /resource?_sort=field&_order=ASC&_start=0&_end=10  -> list (+ X-Total-Count header)
 *   GET    /resource/:id                                       -> getOne
 *   GET    /resource?id=1&id=2                                 -> getMany
 *   GET    /resource?field=value&_start=..&_end=..             -> getManyReference
 *   POST   /resource                                           -> create
 *   PUT    /resource/:id                                       -> update
 *   PUT    /resource/:id (loop)                                -> updateMany
 *   DELETE /resource/:id                                       -> delete
 *   DELETE /resource/:id (loop)                                -> deleteMany
 */
export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const client = getAxiosInstance();
    const { page = 1, perPage = 10 } = params.pagination ?? {};
    const { field = "id", order = "ASC" } = params.sort ?? {};

    const query: Record<string, unknown> = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      ...params.filter,
    };

    const { data, headers } = await client.get(`/${resource}`, { params: query });

    const totalHeader = headers["x-total-count"];
    const total = totalHeader ? parseInt(totalHeader, 10) : data.length;

    return { data, total };
  },

  getOne: async (resource, params) => {
    const client = getAxiosInstance();
    const { data } = await client.get(`/${resource}/${params.id}`);
    return { data };
  },

  getMany: async (resource, params) => {
    const client = getAxiosInstance();
    const { data } = await client.get(`/${resource}`, {
      params: { id: params.ids },
    });
    return { data };
  },

  getManyReference: async (resource, params) => {
    const client = getAxiosInstance();
    const { page = 1, perPage = 10 } = params.pagination ?? {};
    const { field = "id", order = "ASC" } = params.sort ?? {};

    const query: Record<string, unknown> = {
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      ...params.filter,
    };

    const { data, headers } = await client.get(`/${resource}`, { params: query });
    const totalHeader = headers["x-total-count"];
    const total = totalHeader ? parseInt(totalHeader, 10) : data.length;

    return { data, total };
  },

  create: async (resource, params) => {
    const client = getAxiosInstance();
    const { data } = await client.post(`/${resource}`, params.data);
    return { data };
  },

  update: async (resource, params) => {
    const client = getAxiosInstance();
    const { data } = await client.put(`/${resource}/${params.id}`, params.data);
    return { data };
  },

  updateMany: async (resource, params) => {
    const client = getAxiosInstance();
    await Promise.all(
      params.ids.map((id) => client.put(`/${resource}/${id}`, params.data))
    );
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    const client = getAxiosInstance();
    const { data } = await client.delete(`/${resource}/${params.id}`);
    return { data };
  },

  deleteMany: async (resource, params) => {
    const client = getAxiosInstance();
    await Promise.all(params.ids.map((id) => client.delete(`/${resource}/${id}`)));
    return { data: params.ids };
  },
};
