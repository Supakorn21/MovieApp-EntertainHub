import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { motion, AnimatePresence } from "framer-motion";

import './Trending.css'

const Trending = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&language=th-TH`);

    // console.log(data)
    setContent(data.results);
  };

  useEffect(() => {
    document.title = "กำลังฮิต";
    fetchTrending();
  }, [page]);

  return (
    <div >
      <span className="pageTitle">กำลังฮิต</span>
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
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
          </AnimatePresence>
      </motion.div>
      <CustomPagination setPage={setPage}/>
    </div>
  );
};

export default Trending;
