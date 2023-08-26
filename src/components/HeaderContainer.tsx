import { RefObject } from 'react';
import HeaderUI from './HeaderUI';

interface HeaderContainerProps {
  deleteModalRef: RefObject<HTMLDialogElement>;
}

function HeaderContainer({ deleteModalRef }: HeaderContainerProps) {
  const openDeleteModal = () => {
    deleteModalRef.current?.showModal();
  };

  return <HeaderUI openDeleteModal={openDeleteModal} />;
}

export default HeaderContainer;
