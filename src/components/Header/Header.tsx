import {useNavigate} from 'react-router-dom';
import { Search } from './Search';
import styles from './header.module.scss';
import icon from 'assets/images/rick-and-morty-icon.png';

export const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('');
  }

  return (
    <header className={styles.header}>
      <img src={icon} alt="logo" className={styles.logo} onClick={handleLogoClick}/>
      <Search/>
    </header>
  );
};
