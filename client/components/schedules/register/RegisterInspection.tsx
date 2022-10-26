import React, { PropsWithChildren } from "react";
import RegisterInspectionHeader from "./RegisterInspectionHeader";

// React.FC를 사용할 경우 children type을 가지고 있지 않아 자식 컴포넌트에서 에러메시지 발생
// 참고 ==> https://2mojurmoyang.tistory.com/243
const RegisterInspection = (props: any) => {
    return (
        <div>
            <RegisterInspectionHeader />
            {props.children}
        </div>
    )
}

export default RegisterInspection;