import { Article, Comment, NewArticle, PaginatedRep } from '../models'

type DtoWithDate<T = unknown> = T & { date?: string | Date }

class ApiClient {
  toJson = async <T>(rep: Response): Promise<T> => {
    const json = (await rep.json()) as T
    return json
  }

  getArticles = async (limit = 2, offset = 0): Promise<PaginatedRep<Article>> => {
    const rep = await fetch(`/api/article?limit=${limit}&offset=${offset}`)
    return this.toJson<PaginatedRep<Article>>(rep)
  }
  getArticle = async (id: string): Promise<Article> => {
    const rep = await fetch(`/api/article/${id}`)
    if (rep.status === 404) throw new Error()
    return this.toJson<Article>(rep)
  }
  postArticle = async (article: NewArticle): Promise<Article> => {
    const rep = await fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify(article),
    })
    const { date, id } = await this.toJson<Article>(rep)
    return { ...article, date, id }
  }
  getArticleComments = async (articleId: string): Promise<{ records: Comment[] }> => {
    const rep = await fetch(`/api/comment?article=${articleId}`)
    const json = (await rep.json()) as { records: Comment[] }
    return json
  }
}

export const apiClient = new ApiClient()
