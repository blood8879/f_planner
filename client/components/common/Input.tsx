import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

type InputContainerProps = {
    iconExist: boolean;
}

const Container = styled.div<InputContainerProps>`
    input {
        position: relative;
        width: 100%;
        height: 46px;
        padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px" : "0 11px")};
        border: 1px solid ${palette.gray_eb};
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        ::placeholder {
            color: ${palette.gray_76};
        }
        & :focus {
            border-color: ${palette.dark_cyan} !important;
        }
    }
    label {
        span {
            display: block;
            margin-bottom: 8px;
        }
    }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    label?: string;
}

const Input: React.FC<IProps> = ({ icon, label, ...props }) => {
   return (
        <Container
            iconExist={!!icon}
        >
            {label && (
                <label>
                    <span>{label}</span>
                    <input {...props} />
                </label>
            )}
        </Container>
   ) 
}

export default React.memo(Input);