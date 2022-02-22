import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import Chip from '@mui/material/Chip';
import Genres from '../../components/Genres/Genres';
import useGenre from '../../hooks/useGenres';
import { motion,AnimatePresence } from "framer-motion"



const Movies = () => {

  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])
  const genreforURL = useGenre(selectedGenres)

  const fetchMovies = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=th-TH&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)

    setContent(data.results)
    // console.log(data);
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    document.title = "ซีรีย์";
   fetchMovies()
  }, [page, genreforURL])
  


  return (
    <div>
        <span className='pageTitle'>ซีรีย์</span>
        <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        page={page}
        setPage={setPage}
        />
        <motion.div layout className="trending">
          <AnimatePresence>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
          </AnimatePresence>
      </motion.div>
      { numOfPages > 1 && (
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}

    </div>
  )
}

export default Movies