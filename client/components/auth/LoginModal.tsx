import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Container = styled.div`

`;

interface IProps {
    closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const dispatch = useDispatch();

    return (
        <Container>

        </Container>
    )
}

export default LoginModal;