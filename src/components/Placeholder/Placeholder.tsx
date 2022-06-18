import styles from './placeholder.module.scss';

type PlaceholderProps = {
  text: string
}

export const Placeholder = ({text}: PlaceholderProps) => {
  return (
    <div className={styles.placeholder}>
      {text}
    </div>
  );
};
