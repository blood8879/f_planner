import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";

const normalSelectorStyle = css`

`;

const RegisterSelectorStyle = css`

`;

interface SelectorContainerProps {
    type: "register" | "normal"
}

const Container = styled.div<SelectorContainerProps>`
    ${({ type }) => type === "normal" && normalSelectorStyle}
    ${({ type }) => type === "register" && RegisterSelectorStyle}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    value?: string;
    type?: "register" | "normal";
}

const Selector: React.FC<IProps> = ({
    options = [],
    type = "normal"
}) => {
    return (
        <Container
            type={type}
        >
            <label>
                Selector
            </label>
        </Container>
    )
}

export default React.memo(Selector);