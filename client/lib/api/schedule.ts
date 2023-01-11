import axios from "axios";
import { ScheduleType } from "../../types/schedule";

export const registerScheduleAPI = (body: ScheduleType) =>
    axios.post("/api/schedule/registerSchedule", body);

export const reviseScheduleAPI = (body: ScheduleType) =>
    axios.put("/api/schedule/:id", body);

export const deleteScheduleAPI = (id: any) =>
    axios.delete("/api/schedule/:id", {
        data: {
            id
        }
    });