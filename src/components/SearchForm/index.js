import React, { useState } from 'react'

const SearchForm = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    onSubmit({ keyword })
  }

  const handleChange = evt => {
    setKeyword(evt.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button>Buscar!</button>
      <input onChange={handleChange} type='text' value={keyword} />
    </form>
  )
}

export default React.memo(SearchForm)
