import React, { useState } from "react";
import styled from "styled-components";
import Selector from "../../common/Selector";
import RegisterInspection from "./RegisterInspection";

const Container = styled.div`
    .inspection-wrapper {
        padding: 20px 10px 0 10px;
        display: flex;
    }

    .inspection-selector-wrapper {
        padding: 20px 10px 0 10px;
        width: 15%;
    }

    .inspection-content-wrapper {
        padding: 20px 10px 0 10px;
        width: 85%;
    }
`;

const inspectionType = [
    "정기점검",
    "기술지원",
    "인수인계"
]

const RegisterInspectionCustomer: React.FC = () => {
    const [type, setType] = useState("inspection");

    return (
        <RegisterInspection>
            <Container>
                <div className="inspection-wrapper">
                    <div className="inspection-selector-wrapper">
                        <Selector
                            type="normal"
                            options={inspectionType}
                            label="점검 유형을 선택해주세요."
                        />
                    </div>
                    <div className="inspection-content-wrapper">
                        2
                    </div>
                </div>
            </Container>        
        </RegisterInspection>
    )
}

export default RegisterInspectionCustomer;