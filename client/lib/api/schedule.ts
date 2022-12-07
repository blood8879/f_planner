import axios from "axios";
import { ScheduleType } from "../../types/schedule";

export const registerScheduleAPI = (body: ScheduleType) =>
    axios.post("/api/schedule/registerSchedule", body);