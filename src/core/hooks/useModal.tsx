import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState<boolean>(false);

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  return { modal, handleOpen, handleClose };
};

export default useModal;
