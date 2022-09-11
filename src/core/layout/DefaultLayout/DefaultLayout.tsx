import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from 'core/components/ErrorBoundary/ErrorBoundary';
import { tDefaultLayout, useStyles } from './DefaultLayout.internals';

const DefaultLayout = ({ children }: tDefaultLayout) => {
  const { root } = useStyles();

  return (
    <Box component='section' className={`hero is-fullheight ${root}`}>
      <Header />

      <div className='container is-fluid'>
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>

      <Box component='footer' className='hero-foot'>
        <Footer />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
