import "../CSS/Modal.css"

function Modal(props) {
  return (
    <div className="modal-wrapper" onClick={e => props.closeModal()}>
      {props.children}
    </div>
  )
}

export default Modal