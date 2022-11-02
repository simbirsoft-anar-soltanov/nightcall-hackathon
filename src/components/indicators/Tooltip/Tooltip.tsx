import { FC, ReactNode } from 'react';
import {
  styled,
  Tooltip as TooltipMui,
  TooltipProps,
  tooltipClasses,
  Zoom,
} from '@mui/material';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <TooltipMui {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #DBDBDB',
    boxShadow: theme.shadows[2],
    color: '#1E1E1E',
    fontSize: 12,
  },
}));

type tTooltipProps = {
  title: string;
  children: ReactNode;
};

const Tooltip: FC<tTooltipProps> = ({ title, children }) => {
  return (
    <div>
      <LightTooltip
        title={title}
        placement='top-start'
        TransitionComponent={Zoom}
      >
        <span>{children}</span>
      </LightTooltip>
    </div>
  );
};

export default Tooltip;
