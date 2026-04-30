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
        <div style={{position:"fixed", inset:0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", border: "1px solid #e2e8f0",}}>
            <div  dir="rtl" style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", width: "900px", maxWidth: "90%", }} >
                <button onClick={onClose} style={{ float: "left", color: "#dc2626", fontWeight: "bold" }}>X</button>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;