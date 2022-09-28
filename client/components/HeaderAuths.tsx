import React from "react"
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal"
import { authActions } from "../store/auth";


const HeaderAuths: React.FC = () => {
    const { openModal, closeModal } = useModal();

    const dispatch = useDispatch();

    return (
        <>
            <div className="header-auth-buttons">
                <button
                    className="header-sign-up-button"
                    type="button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("signup"));
                        openModal;
                    }}
                >
                    회원가입
                </button>
                <button
                    className="header-login-buttons"
                    type="button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("login"));
                        openModal();
                    }}
                >
                    로그인
                </button>
            </div>
        </>
    )
}

export default HeaderAuths;