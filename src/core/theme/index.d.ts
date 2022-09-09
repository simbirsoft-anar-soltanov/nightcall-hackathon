import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    xm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodyL: CSSProperties;
    bodyM: CSSProperties;
    bodyS: CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodyL: CSSProperties;
    bodyM?: CSSProperties;
    bodyS?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyL: true;
    bodyM: true;
    bodyS: true;
  }
}
