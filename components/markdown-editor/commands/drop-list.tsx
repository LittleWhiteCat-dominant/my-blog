import React, { useEffect } from 'react';

interface DropListProps {
  show: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const DropList: React.FC<DropListProps> = (props) => {
  useEffect(() => {
    handleClose.bind(this);
  }, [])

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const { onClose } = props;
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  return (
    <div className={`drop-wrap ${props.show ? 'show' : 'hidden'}`} onClick={handleClose}>
      {props.children}
    </div>
  );
}
export default DropList;