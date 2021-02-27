import { useEffect, useState, useContext } from 'react'
import getGifs from 'services/getGifs'
import GifsContext from 'context/GifsContext'

const INITIAL_PAGE = 0

export function useGifs ({ keyword, limit } = { keyword: null }) {
  const [loading, setLoading] = useState(false) // eslint-disable-line
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [page, setPage] = useState(INITIAL_PAGE)
  const { gifs, setGifs } = useContext(GifsContext)

  const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'futbol'

  useEffect(function () {
    setLoading(true)

    getGifs({ keyword: keywordToUse, limit: limit })
      .then(gifs => {
        setGifs(gifs)
        setLoading(false)
        localStorage.setItem('lastKeyword', keyword)
      })
  }, [keyword, keywordToUse, setGifs, limit])

  useEffect(function () {
    if (page === INITIAL_PAGE) return

    setLoadingNextPage(true)

    getGifs({ keyword: keywordToUse, limit: limit, page })
      .then(nextGifs => {
        setGifs(prevGifs => prevGifs.concat(nextGifs))
        setLoadingNextPage(false)
      })
  }, [page, keywordToUse, setGifs, limit])

  return { loadingNextPage, gifs, setPage }
}
