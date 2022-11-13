import { FC, MouseEvent } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type tToggle = {
  value: string;
  handleChange: (_: MouseEvent<HTMLElement>, newAlignment: string) => void;
};

const Toggle: FC<tToggle> = ({ value, handleChange }) => {
  return (
    <ToggleButtonGroup
      color='primary'
      value={value}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
      size='small'
    >
      <ToggleButton value='ready'>Готов</ToggleButton>
      <ToggleButton value='dontDisturb'>Занят</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Toggle;
