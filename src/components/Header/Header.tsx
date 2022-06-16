import { Search, SearchIconWrapper, StyledInputBase } from 'MUIHelper/Search';
import SearchIcon from '@mui/icons-material/Search';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </header>
  );
};
