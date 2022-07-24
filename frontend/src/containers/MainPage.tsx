import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddArticleForm } from '../components/AddArticleForm'
import { Filter } from '../components/Filter'
import { PagePreload } from '../components/Spinner'
import { formatDate } from '../helpers'
import { Article } from '../models'
import { filteredByName, setPage } from '../redux/reducers/articleReducer'
import { Pagination, StoreEnpointsName, useGetArticlesQuery, usePrefetch } from '../redux/rtk'

const ArticleComponent: React.FC<{ article: Article }> = ({ article }) => {
  const { title, text, date, id } = article
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>

        <div className="card-actions justify-end">
          <p>{formatDate(date)}</p>
          <Link to={`/article/${id}`} className="btn btn-primary">
            read more
          </Link>
        </div>
      </div>
    </div>
  )
}

export const MainPage = () => {
  const [pagination, setPagination] = useState<Pagination>({ offset: 0, limit: 2 })
  const [end, setEnd] = useState(false)
  const { offset, limit } = pagination
  const { data, isLoading } = useGetArticlesQuery(pagination)
  const prefetchPage = usePrefetch(StoreEnpointsName.getArticles)
  const sortedArticles = useSelector(filteredByName)

  const dispatch = useDispatch()
  const getNext = useCallback(() => {
    const nextOffset = offset + limit
    if (data?.total && nextOffset >= data.total) {
      setEnd(true)
      return
    }
    prefetchPage({ offset: offset + limit, limit })
    setPagination({ offset: nextOffset, limit })
  }, [prefetchPage, offset, limit])

  useEffect(() => {
    if (data?.data) {
      dispatch(setPage({ articles: data.data, pagination }))
    }
  }, [data])

  if (isLoading) {
    return <PagePreload />
  }
  return (
    <div className="flex flex-col items-center gap-y-5 w-full">
      <div className="flex max-w-[1200px] w-full mx-auto py-5 px-5 gap-x-5 justify-end">
        <AddArticleForm />
        <Filter />
      </div>

      {sortedArticles.map((x) => (
        <ArticleComponent article={x} key={x.id} />
      ))}
      {!end && (
        <button className="btn btn-outline" onClick={getNext}>
          get next
        </button>
      )}
    </div>
  )
}
