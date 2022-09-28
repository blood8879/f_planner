import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signupAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import Input from "../common/Input";

const Container = styled.div`

`;

const PASSWORD_MIN_LENGTH = 8;

interface IProps {
    closeModal: () => void;
}

const SignUpModal : React.FC<IProps> = ({ closeModal }) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();

    // 비밀번호 최소 자리수 체크
    const isPasswordOverMinLength = useMemo(
        () => !!password && password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );

    // 비밀번호 숫자나 특수기호 포함여부 체크
    const isPasswordHasNumberOrSymbol = useMemo(
        () => 
            /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
            /[0-9]/g.test(password),
        [password]
    );

    const onSubmitSignup = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const signUpBody = {
                email,
                name,
                password,
            };

            const { data } = await signupAPI(signUpBody);
            dispatch(userActions.setLoggedUser(data));
            closeModal();
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        
    }, []);

    return (
        <Container>
            <form onSubmit={onSubmitSignup}>
                <div className="sign-up-input-wrapper">
                    <Input placeholder="이메일 주소" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </form>
        </Container>
    ) 
};

export default SignUpModal;