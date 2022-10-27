import { FC } from 'react';
import { Box } from '@mui/material';
import Step from 'components/view/Step/Step';
import { steps } from './ForOrganization.internals';

const sxContainer = {
  display: 'grid',
  gridTemplate: '1fr 1fr/1fr 1fr',
  padding: '24px 40px',
  gap: '24px',
};

const ForOrganization: FC = () => {
  return (
    <Box component='section' sx={sxContainer}>
      {steps.map(({ icon, stepNumber, title }) => (
        <Step
          icon={icon}
          stepNumber={stepNumber}
          title={title}
          key={stepNumber}
        />
      ))}
    </Box>
  );
};

export default ForOrganization;
