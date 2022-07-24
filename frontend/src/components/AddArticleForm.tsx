import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiClient } from '../api/ApiClient'
import { NewArticle } from '../models'
import { setArticle } from '../redux/reducers/articleReducer'
import { Drawer } from './Drawer'
import { Input } from './Input'
import { Spinner } from './Spinner'

const initialState: NewArticle = {
  text: '',
  title: '',
}

export const AddArticleForm = () => {
  const [{ text, title }, setForm] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const reset = () => setForm(initialState)
  const submit = async () => {
    setLoading(true)
    const rep = await apiClient.postArticle({ text, title })
    dispatch(setArticle({ article: rep }))
    setLoading(false)
    setOpen(false)
    reset()
  }

  return (
    <Drawer open={open} setOpen={setOpen} onClose={reset}>
      <div className="flex flex-col gap-y-5">
        <Input value={title} onChange={(value) => setForm((x) => ({ ...x, title: value }))} label="Article Tite" />
        <Input value={text} onChange={(value) => setForm((x) => ({ ...x, text: value }))} label="Article text" />
        <button onClick={submit} disabled={!text || !title || loading} className="btn btn-primary">
          sumbit
          {loading && <Spinner className="h-4 w-4 ml-4" />}
        </button>
      </div>
    </Drawer>
  )
}
