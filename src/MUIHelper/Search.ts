import {alpha, InputBase, styled} from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '160px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '230px',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
