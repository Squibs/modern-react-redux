import React from 'react';
import ReactDOM from 'react-dom';

/* ---------------------------------- Types --------------------------------- */

type OwnProps = {
  modalTitle: string;
  modalContent: string;
  modalActions: JSX.Element;
  modalOnDismiss: () => void;
};

type Props = OwnProps;

/* -------------------------------- Component ------------------------------- */

const Modal: React.FC<Props> = ({
  modalTitle,
  modalContent,
  modalActions,
  modalOnDismiss,
}: Props) => {
  return ReactDOM.createPortal(
    <div role="none" className="ui dimmer modals visible active" onClick={modalOnDismiss}>
      <div
        role="none"
        className="ui standard modal visible active"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">{modalTitle}</div>
        <div className="content">{modalContent}</div>
        <div className="actions">{modalActions}</div>
      </div>
    </div>,

    document.querySelector('#modal') as Element,
  );
};

export default Modal;

// targets a secondary sibling of <body>, <div id="modal"> rather than <div id="root">;
// otherwise content would be replaced

// we have to put in onClick={(e) => e.stopPropagation()}, due to events bubbling up to the appropriate event handler.
// to prevent this we need to stopPropagation() on the element we don't want the event from happening on. prevents the event from bubbling up
