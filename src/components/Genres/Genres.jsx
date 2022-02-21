import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";


import axios from "axios";
import React, { useEffect } from "react";
import "./Genres.css";

import {motion, AnimatePresence} from "framer-motion";

const darkTheme = createTheme({
    palette: {
      mode: "dark",
      
    },
  
  });


const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
  page,
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };
    

    

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=th-TH`
    );

    setGenres(data.genres);
    // console.log(data);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div className="genres-container">
        <ThemeProvider theme={darkTheme}>
        {
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            color="primary"
            variant="outlined"
            style={{ margin: 2 }}
            clickable
            size="small"
            key={genre.id}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {
        genres.map((genre) => (
          <Chip
            label={genre.name}
            onClick={() => handleAdd(genre)}
            style={{ margin: 2, cursor: "pointer" }}
            clickable
            size="small"
            key={genre.id}
          />
        ))}
        </ThemeProvider>
    </div>
  );
};

export default Genres;
