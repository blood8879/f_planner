import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";

const Container = styled.div`

`;

const useModal = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    interface IProps {
        children: React.ReactNode;
    }

    const router = useRouter();

    useEffect(() => {
        return() => {
            closeModal();
        }
    }, [router]);

    const ModalPortal : React.FC<IProps> = ({ children }) => {
        const ref = useRef<Element | null>();
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
            if(document) {
                const dom = document.querySelector("#root-modal");
                ref.current = dom;
            }
        }, []);

        if(ref.current && mounted && modalOpened) {
            return createPortal(
                <Container>
                    <div 
                        className="modal-background" 
                        role="presentation"
                        onClick={closeModal}
                    />
                    <div className="modal-contents">
                        <button type="button" onClick={closeModal}/>
                        {children}
                    </div>
                </Container>,
                ref.current
            );
        }
        return null;
    }

    return {
        openModal,
        closeModal,
        ModalPortal: React.memo(ModalPortal),
    }
};

export default useModal;