import type { ReactNode } from "react";


interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, title, onClose, children }: ModalProps) => {
    if(!isOpen) return null;
    return(
        <div style={{position:"fixed", inset:0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, }}>
            <div  dir="rtl" style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", width: "400px", maxWidth: "90%", }} >
                <button onClick={onClose}>X</button>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;