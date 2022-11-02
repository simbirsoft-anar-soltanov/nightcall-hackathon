import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { firebase } from 'lib/firebase';
import { statusEvents } from 'pages/OrgPage/components/OrderBoxList/OrderBoxList.internals';

type tFecthDataOptions = Partial<{
  item: any;
  isPrev: boolean;
  isNext: boolean;
}>;

export const usePagination = (tab: number) => {
  const [list, setList] = useState<DocumentData>([]);
  const [page, setPage] = useState<number>(1);

  const fetchData = async ({ item, isPrev, isNext }: tFecthDataOptions) => {
    statusEvents[tab];

    const baseResult = await firebase
      .firestore()
      .collection('events')
      .where('status', '>=', statusEvents[tab])
      .limit(2);

    if (!isPrev && !isNext) {
      await baseResult.onSnapshot((querySnapshot) => {
        setList(querySnapshot);
      });
    }

    if (isPrev && item) {
      await baseResult
        .orderBy('status', 'desc')
        .endBefore(statusEvents[tab])
        .limitToLast(2)
        .onSnapshot((querySnapshot) => {
          setList(querySnapshot);
          setPage(page - 1);
        });
    }

    if (isNext && item) {
      await baseResult
        .orderBy('status', 'desc')
        .startAfter(statusEvents[tab])
        .limit(2)
        .onSnapshot((querySnapshot) => {
          setList(querySnapshot);
          setPage(page + 1);
        });
    }
  };

  useEffect(() => {
    fetchData({});
  }, [tab]);

  const showPrevious = ({ item }: any) => {
    fetchData({ item, isPrev: true });
  };

  const showNext = ({ item }: any) => {
    fetchData({ item, isNext: true });
  };

  return { list, page, showPrevious, showNext };
};
