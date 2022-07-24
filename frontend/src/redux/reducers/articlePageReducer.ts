import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '../../models'
import { RootState } from '../store'

type ArticleState = {
  article?: Article
}

const initialState: ArticleState = {}

const articleSlice = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    setArticlePage: (state, { payload }: PayloadAction<Article>) => ({ article: payload }),
    reset: () => initialState,
  },
})

export const { setArticlePage, reset } = articleSlice.actions
export const articlePageReducer = articleSlice.reducer

const selectArticle = (state: RootState) => state.articlePage
export const articlePageSelector = createSelector([selectArticle], ({ article }) => article)
