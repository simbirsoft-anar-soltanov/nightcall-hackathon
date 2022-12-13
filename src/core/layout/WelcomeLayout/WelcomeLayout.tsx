import { FC } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Preview from './components/Preview/Preview';
import ForOrganization from './components/ForOrganization/ForOrganization';
import Registration from './components/Registration/Registration';
import Footer from './components/Footer/Footer';
import { sxContainer } from './WelcomeLayout.internals';

const WelcomeLayout: FC = () => {
  return (
    <Box sx={sxContainer}>
      <Header />
      <Preview />
      <ForOrganization />
      <Registration />
      <Footer />
    </Box>
  );
};

export default WelcomeLayout;
