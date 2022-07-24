import { createApi, fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore, createSelector } from '@reduxjs/toolkit'
import { Article, PaginatedRep } from '../models'

export type Pagination = { offset: number; limit: number }

export enum StoreEnpointsName {
  getArticles = 'getArticles',
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query<PaginatedRep<Article>, Pagination>({
      query: ({ offset, limit }) => `article?limit=${limit}&offset=${offset}`,
    }),
  }),
})

export const { useGetArticlesQuery, usePrefetch } = api

// const getStoreSelect = (store: RootState) => store
// export const selectArticles = createSelector([getStoreSelect], (state) => state.api)
