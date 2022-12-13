import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { sxTitleHead, sxNameHead } from './TitleHead.internals';

type tTitleHeadProps = {
  title: string;
  namePage: string;
};

const TitleHead: FC<tTitleHeadProps> = ({ title, namePage }) => (
  <Grid container justifyContent='space-between' alignItems='center'>
    <Typography sx={sxTitleHead}>{title}</Typography>
    <Typography sx={sxNameHead}>{namePage}</Typography>
  </Grid>
);

export default TitleHead;
