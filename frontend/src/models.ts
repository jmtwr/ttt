export type PaginatedRep<T> = {
  data: T[]
  total: number
}

export const isPaginatedRep = <T>(x: T | PaginatedRep<T>): x is PaginatedRep<T> => {
  return 'data' in x
}

export type Article = {
  id: string
  text: string
  title: string
  date: Date
}
export type NewArticle = Omit<Article, 'id' | 'date'>

export type Comment = {
  id: number
  user: string
  text: string
  article: string
}
