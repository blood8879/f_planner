import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { registerCustomerActions } from "../../store/registerCustomer";
import palette from "../../styles/palette";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";

const Contaner = styled.div`
    padding: 62px 30px 100px;
    h2 {
        font-size: 19px;
        font-weight: 800;
        margin-bottom: 56px;
    }
    h3 {
        font-weight: bold;
        color: ${palette.gray_76};
        margin-bottom: 6px;
    }
    .register-customer-date-wrapper {
        display: flex;
        align-items: center;
        label {
            span {
                display: block;
                margin-bottom: 8px;
            }
        }
    }
`;

const RegisterCustomer: React.FC = () => {
    const opened = useSelector((state) => state.registerCustomer.opened);
    const license = useSelector((state) => state.registerCustomer.license);

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [handler, setHandler] = useState("");
    const [handlerNum, setHandlerNum] = useState("");
    const [paidSupport, setPaidSupport] = useState(false);

    const dateOpened = opened ? new Date(opened) : null;
    const dateLicense = license ? new Date(license) : null;

    const onChangeOpenDate = (date: Date | null) => {
        console.log("date===", date);
    }

    const dispatch = useDispatch();

    return(
        <Contaner>
            <h2>고객사 관리</h2>
            <form>
                <div>
                    <Input placeholder="고객사명을 입력해 주세요." name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <Input placeholder="고객사명을 입력해 주세요." name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="register-customer-date-wrapper">
                    <h3>오픈일이 언제인가요?</h3>
                    <DatePicker
                        selected={dateOpened}
                        onChange={onChangeOpenDate}
                    />
                </div>
            </form>
        </Contaner>
    )
};

export default RegisterCustomer;