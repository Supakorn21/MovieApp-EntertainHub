import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { makeStyles } from "@mui/styles";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';

import { useEffect, useState  } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if(value === 0) {
        history.push('/')
    }else if(value === 1){
        history.push('/movies')
    }else if(value === 2){
        history.push('/series')
    }else if(value === 3){
        history.push('/search')
    }
  }, [value, history]);
  

  return (
    <Box>
      <BottomNavigation
        className={classes.root}
        style={{ backgroundColor: "#2d313a" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="กำลังฮิต"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="ภาพยนตร์"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="ซีรีย์"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="ค้นหา"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
