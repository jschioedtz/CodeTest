import * as React from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import CameraIcon from '@mui/icons-material/Camera';
import ResetIcon from '@mui/icons-material/RestartAlt';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface SearchProps {
    onChange: (username: string) => void;
}

// An enum with all the types of actions 
enum CountActionType {
    increment = "increment",
    incrementRandom = "incrementRandom",
    incrementOdd = "incrementOdd",
    decrement = "decrement",
    reset = "reset",
}

// An interface for our actions
interface CountAction {
    type: CountActionType;
}

// An interface for our state
interface CountState {
    count: number;
}

function counterReducer(state: CountState, action: CountAction) {

    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        // Task 4.2
        case "incrementRandom":
            return { count: state.count + Math.floor(Math.random() * 10) + 1 };
        // Task 4.3
        case "incrementOdd":
            return { count: state.count % 2 === 0 ? state.count + 1 : state.count + 2 };
        case "decrement":
            return { count: state.count > 0 ? state.count - 1 : 0 };
        // Task 4.5
        case "reset":
            return { count: 0 };
        default:
            throw new Error();
    }
}

const PrimarySearchAppBar: React.FC<SearchProps> = ({ onChange }) => {

    const [countState, dispatch] = React.useReducer(counterReducer, { count: 0 });

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    DSV
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        onChange={(event) => onChange(event.target.value)}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <IconButton
                    onClick={() => dispatch({ type: CountActionType.decrement })}
                    aria-label="Decrement"
                >
                    <ArrowCircleDownIcon />
                </IconButton>
                <IconButton
                    onClick={() => dispatch({ type: CountActionType.increment })}
                    aria-label="Increment"
                >
                    <ArrowCircleUpIcon />
                </IconButton>
                <IconButton
                    onClick={() => dispatch({ type: CountActionType.incrementOdd })}
                    aria-label="Increment odd"
                >
                    <PlusOneIcon />
                </IconButton>
                <IconButton
                    onClick={() => dispatch({ type: CountActionType.incrementRandom })}
                    aria-label="Increment random"
                >
                    <CameraIcon />
                </IconButton>
                <IconButton
                    onClick={() => dispatch({ type: CountActionType.reset })}
                    aria-label="Reset"
                >
                    <ResetIcon />
                </IconButton>
                 
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                   Count: {countState.count}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
             </Toolbar>
        </AppBar>
    </Box>
  );
}

export default PrimarySearchAppBar;
