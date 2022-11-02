import { FC } from 'react';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import styles from './SpinnerWrap.module.scss';

type tSpinnerWrapProps = {
  isInside?: boolean;
};

const SpinnerWrap: FC<tSpinnerWrapProps> = ({ isInside }) => {
  return isInside ? (
    <Loader width={140} height={140} />
  ) : (
    <div className={styles['spinner__container']}>
      <Loader width={140} height={140} />
    </div>
  );
};

export default SpinnerWrap;
