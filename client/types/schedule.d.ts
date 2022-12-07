// 일정 타입
export type ScheduleType = {
    issued: Date | null | undefined;
    customer: string | undefined;
    type: string;
}