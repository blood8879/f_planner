import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";

const normalSelectorStyle = css`
    label {
        font-size: 15px;
        .span {
            font-
        }
    }
    select {
        width: 100%;
        height: 36px;
        border: 1px solid;
        border-radius:
    }
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
    disabledOptions?: string[];
    isValid?: boolean;
}

const Selector: React.FC<IProps> = ({
    label,
    boolean = true,
    options = [],
    type = "normal",
    disabledOptions = [],
    isValid,
    ...props
}) => {
    return (
        <Container
            type={type}
        >
            <label>
                {label && <span>{label}</span>}
                <select {...props}>
                    {disabledOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
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