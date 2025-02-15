import { createContext, ReactNode, useContext, useState } from "react";
import { Modal } from "react-bootstrap";

export interface ModalContextType {
    showModal: (title: string, body: any) => void,
    hideModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null);

export interface ModalProviderProps {
    children: ReactNode;
}

interface ModalProps {
    title: string;
    body: any;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }: ModalProviderProps) => {

    const [modal, setModal] = useState<ModalProps | null>(null);

    const showModal = (title: string, body: any) => {
        setModal({ title, body });
    };

    const hideModal = () => {
        setModal(null);
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {modal && (
                <Modal
                    show={modal !== null}
                    onHide={() => setModal(null)}
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>{modal.title}</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modal.body}
                    </Modal.Body>
                </Modal>
            )}
        </ModalContext.Provider>
    );
}

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within an ModalProvider");
    }
    return context;
}