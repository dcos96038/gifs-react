import React, { useRef, useEffect, useCallback } from 'react'
import ListOfGifs from 'components/ListOfGifs'
import Spinner from 'components/Spinner'
import { useGifs } from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'

const SearchResults = ({ params }) => {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })

  const externalRef = useRef()
  // const limitGifsRef = useRef()
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  })

  // const handleNextPage = () => console.log("Next page");

  // const debounceHandleNextPage = useCallback(debounce(
  //   () => setPage(prevPage => prevPage + 1), 200
  // ), [setPage])

  const debounceHandleNextPage = useCallback(debounce( // eslint-disable-line
    () => setPage(prevPage => prevPage + 1), 200
  ), [setPage])

  useEffect(function () {
    if (isNearScreen) debounceHandleNextPage()
  }, [debounceHandleNextPage, isNearScreen])

  return (
    <>
      {loading
        ? (<div className='CenterSpinner'><Spinner /></div>)
        : <>
          <h3 className='App-title'>
            {decodeURI(keyword)}
          </h3>
          <ListOfGifs gifs={gifs} />
          <div id='visor' ref={externalRef} />
          </>} {/* eslint-disable-line */}
    </>
  )
}

export default SearchResults
