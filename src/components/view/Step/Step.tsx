import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { sxStepContainer, sxStepNumber, sxStepTitle } from './Step.internals';

type tStepProps = {
  icon: JSX.Element;
  stepNumber: number;
  title: string;
};

const Step: FC<tStepProps> = ({ icon, stepNumber, title }) => (
  <Box sx={sxStepContainer}>
    <Box sx={{ display: 'grid', gap: '10px' }}>
      {icon}
      <Typography sx={sxStepNumber}>Шаг №{stepNumber}</Typography>
    </Box>

    <Typography sx={sxStepTitle}>{title}</Typography>
  </Box>
);

export default Step;
