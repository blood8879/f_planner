import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signupAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

const Container = styled.div`
    .sign-up-input-wrapper {
        position: relative;
        margin-bottom: 16px;
    }

    .sign-up-modal-submit-button-wrapper {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${palette.gray_eb};
    }
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

    // 회원가입 양식 누락 없는지 체크
    const validateSignUpForm = () => {
        if(!email) {
            return false;
        }
        if(!name) {
            return false;
        }
        if(!password) {
            return false;
        }
        // if(!confirmPassword) {
        //     return false;
        // }
        // if(!password || !isPasswordHasNumberOrSymbol || !isPasswordOverMinLength) {
        //     return false;
        // }
        return true;
    }

    const onSubmitSignup = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(validateSignUpForm()) {
            try {
                const signUpBody = {
                    email,
                    name,
                    password,
                };
                console.log("signUpbody==",signUpBody)
                const { data } = await signupAPI(signUpBody);
                console.log("data==",data)
                dispatch(userActions.setLoggedUser(data));
                closeModal();
            } catch(error) {
                console.log(error)
            }
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
                <div className="sign-up-input-wrapper">
                    <Input placeholder="이름" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="sign-up-input-wrapper">
                    <Input placeholder="비밀번호" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="sign-up-modal-submit-button-wrapper">
                    <Button type="submit" color="bittersweet">가입하기</Button>
                </div>
            </form>
        </Container>
    ) 
};

export default SignUpModal;