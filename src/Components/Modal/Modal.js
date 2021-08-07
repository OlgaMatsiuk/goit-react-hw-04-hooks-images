import React, { useEffect} from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');


    const Modal = ({ children, onClose }) => {
        useEffect(() => {
          const handleKeydown = (e) => {
            if (e.code === "Escape") {
              onClose();
            }
          };
      
          window.addEventListener("keydown", handleKeydown);
      
          return () => {
            window.removeEventListener("keydown", handleKeydown);
          };
        }, [onClose]);
  

        const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }


        return createPortal(
            <div className="Overlay" onClick={handleOverlayClick}>
                <div className="Modal">
                {children}
                </div>
            </div>, 
            modalRoot,
        );
    
}

export default Modal;