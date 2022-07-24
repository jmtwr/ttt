import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiClient } from '../api/ApiClient'
import { Spinner } from '../components/Spinner'
import { useSelector } from 'react-redux'
import { articlePageSelector, reset, setArticlePage } from '../redux/reducers/articlePageReducer'
import { useDispatch } from 'react-redux'
import { Comment } from '../models'
import { Input } from '../components/Input'
import { nanoid } from 'nanoid'
import { text } from 'stream/consumers'

export const AtriclePage = () => {
  const { id } = useParams<'id'>()
  const naviagte = useNavigate()
  const [loading, setLoading] = useState(true)
  const article = useSelector(articlePageSelector)
  const [comments, setComments] = useState<Comment[]>([])
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  let mounted = true

  const postComment = () => {
    setComments((x) => [{ id: Date.now(), text: comment, user: 'Anonimous', article: '' }, ...x])
    setComment('')
  }

  const getComments = async () => {
    if (!id) return
    const { records } = await apiClient.getArticleComments(id)
    mounted && setComments(records)
  }

  useEffect(() => {
    const request = async () => {
      if (!id) return
      try {
        setLoading(true)
        const rep = await apiClient.getArticle(id)
        dispatch(setArticlePage(rep))
      } catch {
        naviagte('404')
      } finally {
        mounted && setLoading(false)
      }
    }

    request()

    return () => {
      mounted = false
      dispatch(reset())
    }
  }, [])
  if (loading || !article)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-20 w-20" />
      </div>
    )
  if (!id) return <Navigate to="404" />
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{article.title}</h1>
          <p className="py-6">{article.text}</p>
          {!comments.length && (
            <button onClick={getComments} className="btn btn-primary">
              Show comments
            </button>
          )}

          {comments.length > 0 && (
            <div className="flex flex-col">
              <h3 className="font-bold">Comments</h3>
              {comments.map((x) => (
                <p key={x.id}>
                  <span className="text-xs">{x.text}</span> : by <span className="font-bold">{x.user}</span>
                </p>
              ))}

              <div>
                <Input label="" value={comment} onChange={setComment} />{' '}
                <button disabled={!comment.length} onClick={postComment} className="btn btn-primary">
                  post comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
