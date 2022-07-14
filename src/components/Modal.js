import CloseIcon from '@mui/icons-material/Close';

function Modal({onClose, children}) {
  return (
    <section className="modal">
      <button aria-label="close" onClick={onClose}>
        {<CloseIcon />}
      </button>
      { children }
    </section>
  );
}

export default Modal;