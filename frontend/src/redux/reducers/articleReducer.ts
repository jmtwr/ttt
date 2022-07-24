import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '../../models'
import { Pagination } from '../rtk'
import { RootState } from '../store'

type ArticlesState = {
  articlePages: Record<string, Article[]>
  filter: string
}

const initialState: ArticlesState = {
  articlePages: {},
  filter: '',
}

const articlesSlice = createSlice({
  name: 'articlesSlice',
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<{ articles: Article[]; pagination: Pagination }>) => {
      const { articles, pagination } = payload
      const key = JSON.stringify(pagination)

      return {
        ...state,
        articlePages: {
          ...state.articlePages,
          [key]: articles,
        },
      }
    },
    setArticle: (state, { payload }: PayloadAction<{ article: Article }>) => {
      const { article } = payload
      return {
        ...state,
        articlePages: {
          ...state.articlePages,
          [article.id]: [article],
        },
      }
    },
    setFilter: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        filter: payload,
      }
    },
  },
})

export const { setPage, setArticle, setFilter } = articlesSlice.actions
export const articlesReducer = articlesSlice.reducer

const selectArticles = (state: RootState) => state.articles
export const articlesSelector = createSelector([selectArticles], ({ articlePages }) => {
  const result: Article[] = []

  for (const key in articlePages) {
    const value = articlePages[key]
    result.push(...value)
  }
  return result
})

export const sortedByDates = createSelector([articlesSelector], (articles) => {
  return articles.map((x) => ({ ...x, date: new Date(x.date) })).sort((a, b) => Number(b.date) - Number(a.date))
})

export const filterSelector = createSelector([selectArticles], ({ filter }) => filter)

export const filteredByName = createSelector([sortedByDates, filterSelector], (articles, filter) => {
  return articles.filter((x) => x.title.includes(filter.trim()))
})
