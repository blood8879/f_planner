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
    label?: string;
    options?: string[];
    value?: string;
    boolean?: boolean;
    type?: "register" | "normal";
}

const Selector: React.FC<IProps> = ({
    label,
    boolean = true,
    options = [],
    type = "normal",
    ...props
}) => {
    return (
        <Container
            type={type}
        >
            <label>
                {label && <span>{label}</span>}
                <select {...props}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
        </Container>
    )
}

export default React.memo(Selector);