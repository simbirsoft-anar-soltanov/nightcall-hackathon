import { useState } from 'react';

type tReturnUseModal = {
  modal: boolean;
  handleOpen: VoidFunction;
  handleClose: VoidFunction;
};

const useModal = (): tReturnUseModal => {
  const [modal, setModal] = useState<boolean>(false);

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  return { modal, handleOpen, handleClose };
};

export default useModal;
