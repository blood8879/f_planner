// 다중 이미지 등록시 사용하는 컴포넌트

import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Container = styled.ul`
    width: 200px;
    margin: auto;
`;

interface Iprops {
    logo: string;
}

const RegisterCustomerLogo: React.FC<Iprops> = ({ logo }) => {
    const dispatch = useDispatch();

    // 로고 등록
    const addLogo = () => {
        const el = document.createElement("input");
        el.type = "file";
        el.accept = "image/*";
        el.onchange = (event) => {
            const { files } = event.target as HTMLInputElement;
            if(files) {
                const file = files[0];
                const formData = new FormData();
                formData.append("file", file);

            }
        };

        el.click();
    }

    return (
        <Container>
            <div>
                <img src={logo} alt="" />
            </div>
            
        </Container>
    )
}

export default RegisterCustomerLogo;