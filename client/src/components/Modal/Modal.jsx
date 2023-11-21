import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
	return (
		<div className="modal__back" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
