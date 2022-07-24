import clsx from 'clsx'
import React from 'react'

import { Pagination } from '../redux/rtk'

type PaginationProps = {
  pagination: Pagination
  total: number
  getPage: (pagination: Pagination) => void
}

export const PaginationNav: React.FC<PaginationProps> = ({ pagination, total, getPage }) => {
  const { offset, limit } = pagination
  const pagesCnt = Math.ceil(total / limit)
  const pages = new Array(pagesCnt).fill(0).map((_, idx) => idx)
  const currentPage = offset / limit

  const onClick = (page: number) => {
    return () => {
      getPage({ limit, offset: page * 2 })
    }
  }

  return (
    <div className="btn-group">
      {pages.map((x) => (
        <button onClick={onClick(x)} key={x} className={clsx('btn', x === currentPage && 'btn-active')}>
          {x + 1}
        </button>
      ))}
    </div>
  )
}
