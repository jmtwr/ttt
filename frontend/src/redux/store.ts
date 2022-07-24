import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { articlePageReducer } from './reducers/articlePageReducer'
import { articlesReducer } from './reducers/articleReducer'
import { api } from './rtk'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    articles: articlesReducer,
    articlePage: articlePageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
