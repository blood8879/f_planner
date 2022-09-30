import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../lib/api/auth";
import { useSelector } from "../store";
import { userActions } from "../store/user";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";

const HeaderUserProfile: React.FC = () => {
    // 유저 메뉴 열고 닫힘 여부
    const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
    const userProfileImage = useSelector((state) => state.user.profileImage);

    const dispatch = useDispatch();

    // 로그아웃하기
    const logout = async () =>{
        try {
            await logoutAPI();
            dispatch(userActions.initUser());
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                if(isUsermenuOpened) {
                    setIsUsermenuOpened(false);
                }
            }}
        >
            <button
                className="header-user-profile"
                type="button"
                onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
            >
                <img 
                    src={userProfileImage}
                    className="header-user-profile-image"
                    alt=""
                />
            </button>
            {isUsermenuOpened && (
                <ul className="header-usermenu">
                    <li>정보 수정</li>
                    <Link href="/">
                        <a
                            role="presentation"
                            onClick={() => {
                                setIsUsermenuOpened(false);
                            }}
                        >
                            <li>일정 등록하기</li>
                        </a>
                    </Link>
                    <div className="header-usermenu-divider" />
                    <li role="presentation" onClick={logout}>
                        로그아웃
                    </li>
                </ul>
            )}
        </OutsideClickHandler>
    )
}

export default HeaderUserProfile;