import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({title:'', content: null})

    const openModal = (title, content) => {
        setModalContent({title, content});
        setModalOpen(true);
    };

    const closeModal = () =>{
        setModalOpen(false);
        setModalContent({title: '', content: null});
    };

    return(
        <ModalContext.Provider value={{modalOpen, modalContent, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);