import styles from './header.module.scss';
import { Search } from './Search';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Search/>
    </header>
  );
};
