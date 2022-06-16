import { CharacterLibrary } from './CharacterLibrary';
import styles from './content.module.scss';

export const Content = () => {
  return (
    <main className={styles.content}>
      <CharacterLibrary/>
    </main>
  );
};
