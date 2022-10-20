import React, { EventHandler, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { registerCustomerActions } from "../../store/registerCustomer";
import palette from "../../styles/palette";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import UploadIcon from "../../public/static/svg/customer/upload/upload.svg";
import Selector from "../common/Selector";
import RadioGroup from "../common/RadioGroup";
import axios from "axios";

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
        margin-bottom: 10px;
    }
    .register-customer-date-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        label {
            span {
                display: block;
                margin-bottom: 8px;
            }
        }
        input {
            display: block;
            position: relative;
            width: 100%;
            height: 46px;
            padding: 0 11px;
            border: 1px solid ${palette.gray_eb};
            border-radius: 4px;
            font-size: 16px;
            outline: none;
            & ::placeholder {
                color: ${palette.gray_76};
            }
            & :focues {
                border-color: ${palette.dark_cyan};
            }
        }
    }
    .register-customer-wrapper {
        margin-bottom: 20px;
    }
    .register-customer-logo-wrapper {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px dashed ${palette.gray_bb};
        border-radius: 6px;

        input {
            position: absolute;
            max-width: 200px;
            max-height: 200px;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        img {
            width: 100%;
            max-height: 10%;
        }
    }
    .register-cutomer-handler {
        width: 100%;
        display: flex;
        margin-bottom: 20px;

        .divider {
            width: 10px;
        }

        .flex-grow1 {
            float: left;
            width: 50%;
        }

        .flex-grow2 {
            float: right;
            width: 50%;
        }
    }
`;

const RegisterCustomer: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const opened = useSelector((state) => state.registerCustomer.opened);
    const licenseExp = useSelector((state) => state.registerCustomer.licenseExp);

    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [handler, setHandler] = useState("");
    const [handlerNum, setHandlerNum] = useState("");
    const [paidSupport, setPaidSupport] = useState(true);

    const dateOpened = opened ? new Date(opened) : null;
    const dateLicense = licenseExp ? new Date(licenseExp) : null;

    const onChangeOpenDate = (date: Date | null) => {
        dispatch(registerCustomerActions.setOpenDate(date ? date.toISOString() : null))
    }

    const onChangeLicense = (date: Date | null) => {
        dispatch(registerCustomerActions.setLicenseExpired(date ? date.toISOString() : null))
    }

    const uploadLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files === null) return;

        const file = event.target.files[0];

        console.log("file===", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileInputRef.current!.name);

        try {
            await axios.post(`/register/upload`, formData, {
                headers: { "Context-Type": "multipart/form-data" }
            });
        } catch (e) {
            console.log(e)
        }
    }

    const dispatch = useDispatch();

    const typePaidOptions = [
        {
            label: "유상지원",
            value: true
        },
        {
            label: "무상지원",
            value: false
        }
    ]

    const onChangePaidOption = (value: any) => {
        setPaidSupport(value);
    }

    return(
        <Contaner>
            <h2>고객사 등록</h2>
            <form>
                <h3>고객사명을 입력해 주세요.</h3>
                <div className="register-customer-wrapper">
                    <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <h3>사업명을 입력해 주세요.</h3>
                <div className="register-customer-wrapper">
                    <Input name="project" value={project} onChange={(e) => setProject(e.target.value)} />
                </div>
                <h3>고객사 로고를 등록해 주세요.</h3>
                <div className="register-customer-logo-wrapper">
                    <input type="file" accept="image/*" onChange={uploadLogo} />
                    <Button icon={<UploadIcon />} color="bittersweet" width="167px">
                        사진 업로드
                    </Button>
                </div>
                <h3>서비스 오픈일을 입력해 주세요.</h3>
                <div className="register-customer-date-wrapper">
                    <DatePicker
                        selected={dateOpened}
                        onChange={onChangeOpenDate}
                    />
                </div>
                <div className="register-cutomer-handler">
                    <div className="flex-grow1">
                        <h3>고객사의 프로젝트 담당자는 누구인가요?</h3>
                        <Input name="handler" value={handler} onChange={(e) => setHandler(e.target.value)} />
                    </div>
                    <div className="divider"/>
                    <div className="flex-grow2">
                        <h3>담당자의 전화번호를 입력해 주세요.</h3>
                        <Input name="handlerNum" value={handlerNum} onChange={(e) => setHandlerNum(e.target.value)} />
                    </div>
                </div>
                <h3>라이센스는 언제 만료되나요?</h3>
                <div className="register-customer-date-wrapper">
                    <DatePicker
                        selected={dateLicense}
                        onChange={onChangeLicense}
                    />
                </div>
                <h3>유상지원인가요?</h3>
                <div className="register-customer-wrapper">
                    <RadioGroup 
                        value={paidSupport}
                        onChange={onChangePaidOption}
                        options={typePaidOptions}
                    />
                    {paidSupport}
                </div>
            </form>
        </Contaner>
    )
};

export default RegisterCustomer;