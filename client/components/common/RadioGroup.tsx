import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";

const Container = styled.div`
    .radio-label {
        font-size: 16px;
        font-weight: 600;
        color: ${palette.gray_76};
        margin-bottom: 10px;
    }
    .radio-list-wrapper {
        &:after {
            display: block;
            content: "";
            clear: both;
        }
    }
    label {
        float: left;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 1.2;
        cursor: pointer;
        clear: both;

        &:last-child {
            margin-bottom:
        }
    }

    input[type="radio"] {
        width: 16px;
        height: 16px;
        margin: 0;
        position: relative;
        margin-right: 12px;
        flex-shrink: 0;
        font-size: 16px;
        -webkit-appearance: none;
        border: 1px solid ${palette.gray_b0};
        border-radius: 50%;
        outline: none;
        cursor: pointer;
    }
    input[type="radio"]:checked {
        background-color: ${palette.orange_dv};
        border: 0;
    }
    input[type="radio"]:checked:after {
        content: "";
        width: 6px;
        height: 6px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        border-radius: 50%;
        display: block;
    }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: any;
    onChange?: (value: any) => void;
    options?: { label: string; value: any; description?: string }[];
}

const RadioGroup: React.FC<IProps> = ({
    label,
    value,
    options = [],
    onChange
}) => {
    return (
        <Container>
            <p className="radio-label">{label}</p>
            <div className="radio-list-wrapper">
                {options.map((option, index) => (
                    <label key={index}>
                        <input 
                            type="radio"
                            checked={value === option.value}
                            onChange={() => onChange && onChange(option.value)}
                        />
                        <span>
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
        </Container>
    );
};

export default React.memo(RadioGroup);