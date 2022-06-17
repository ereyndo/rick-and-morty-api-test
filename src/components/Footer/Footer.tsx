import {Typography} from '@mui/material';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Typography variant="body2" align="center">
        {`© ${new Date().getFullYear()} `}
        <span className={styles.footerDescription}>RickAndMortyApiTest by Rostyslav</span>
      </Typography>
    </footer>
  );
};
