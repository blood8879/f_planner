import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

const Container = styled.div`
    .login-input-wrapper {
        position: relative;
        margin-bottom: 16px;
    }

    .login-password-input-wrapper {
        svg {
            cursor: pointer;
        }
    }

    .login-modal-submit-button-wrapper {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${palette.gray_eb};
    }
`;

interface IProps {
    closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
        } else {
            const loginBody = { email, password }

            try {
                const { data } = await loginAPI(loginBody);
                dispatch(userActions.setLoggedUser(data));
                closeModal();
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        return () => {

        };
    }, []);

    return (
        <Container>
            <form onSubmit={onSubmitLogin}>
                <div className="login-input-wrapper">
                    <Input 
                        placeholder="이메일 주소"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="login-input-wrapper login-password-input-wrapper">
                    <Input 
                        placeholder="비밀번호 입력"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-modal-submit-button-wrapper">
                    <Button type="submit" color="bittersweet">로그인</Button>
                </div>
            </form>
        </Container>
    )
}

export default LoginModal;