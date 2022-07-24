import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AtriclePage } from './containers/ArticlePage'
import { MainPage } from './containers/MainPage'
import { NotFound } from './containers/NotFound'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="article/:id" element={<AtriclePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
