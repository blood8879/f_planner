import Link from "next/link"
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
    .inspection-header {
        padding: 15px 12px 10px;
        height: 50px;
        background-color: ${palette.gray_aa};
        display: flex;
        
        .font-color-wrapper {
            font-size: 15px;
            color: white;

            &:hover {
                font-size: 15px;
                color: ${palette.black};
                
            }
        }
    }

    .divider {
        margin-left: 30px;
    }
`;

const RegisterInspectionHeader = () => {
    return (
        <Container>
            <div className="inspection-header">
            <Link href="/schedules/register/inspectionCustomer">
                <a className="font-color-wrapper">외주점검</a>
            </Link>
            <div className="divider" />
            <Link href="/schedules/register/dayoff">
                <a className="font-color-wrapper">연차</a>
            </Link>
            <div className="divider" />
            {/* <Link href="/schedules/register/vacation">
                <a className="font-color-wrapper">휴가</a>
            </Link> */}
        </div>
        </Container>
        
    )
}

export default RegisterInspectionHeader;