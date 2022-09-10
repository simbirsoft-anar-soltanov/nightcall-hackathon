import { Typography } from '@mui/material';

type tErrorDescription = {
  text: string;
  extraStyle?: Record<string, string>;
};

const ErrorDescription = ({ text, extraStyle }: tErrorDescription) => {
  return (
    <Typography
      variant='inherit'
      color='#EF3124'
      fontWeight='400'
      fontSize='14px'
      lineHeight='20px'
      margin='8px 0 0'
      {...extraStyle}
    >
      {text}
    </Typography>
  );
};

export default ErrorDescription;
