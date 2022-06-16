import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {Character} from '../CharacterLibrary';
import styles from './characterCard.module.scss';

type CharacterCardProps = {
  characterData: Character
};

export const CharacterCard = ({characterData}: CharacterCardProps) => {
  return (
    <Card sx={{ maxWidth: 280 }} style={{backgroundColor: "#a0c064"}}>
      <CardActionArea className={styles.cardActionArea}>
        <CardMedia
          component="img"
          height="300"
          image={characterData.image}
          alt="card with a character"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {characterData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {characterData.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
