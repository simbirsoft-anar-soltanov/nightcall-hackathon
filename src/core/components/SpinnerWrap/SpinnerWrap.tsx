import { FC } from 'react';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import styles from './SpinnerWrap.module.scss';

const SpinnerWrap: FC = () => {
  return (
    <div className={styles['spinner__container']}>
      <Loader width={140} height={140} />
    </div>
  );
};

export default SpinnerWrap;
