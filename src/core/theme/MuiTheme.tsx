import { forwardRef, ReactNode } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { createTheme, ThemeProvider, LinkProps } from '@mui/material';

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink data-testid='custom-link' ref={ref} to={href} {...other} />
  );
});

LinkBehavior.displayName = 'LinkBehavior';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      xm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      'Styrene B LC',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '48px',
      color: '#000',
    },
    h4: {
      fontWeight: 400,
      fontSize: 20,
      lineHeight: '28px',
      color: '#000',
    },
    h6: {
      color: '#000',
      fontSize: '18px',
      lineHeight: '24px',
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '24px',
      color: '#AEAAAA',
    },
    body1: {
      fontWeight: 500,
    },
    bodyL: {
      fontSize: '20px',
      lineHeight: '32px',
      fontWeight: 400,
    },
    bodyM: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    bodyS: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    button: {
      fontWeight: 500,
      fontSize: 16,
    },
    caption: {
      display: 'inline-block',
      fontWeight: 400,
      color: '#7F7E82',
      fontSize: '20px',
      lineHeight: '24px',
      margin: '20px 0 12px',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

type MuiThemeProps = { children: ReactNode };

const MuiTheme = ({ children }: MuiThemeProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default MuiTheme;
