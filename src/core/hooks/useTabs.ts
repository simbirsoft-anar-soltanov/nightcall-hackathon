import { useState, SyntheticEvent } from 'react';

const useTabs = () => {
  const [tab, setTab] = useState<number>(0);

  const onChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return { tab, onChangeTab };
};

export default useTabs;
