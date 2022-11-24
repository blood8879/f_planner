
import { model, Model, Schema } from "mongoose";

interface DBSchedule {
    name: string
    issued: Date;
    type: string;
    content: string;
};

interface DBScheduleModel extends Model<DBSchedule> {}

const scheduleSchema = new Schema<DBSchedule> ({
    name: { type: String, required: true },
    issued: { type: Date, required: true },
    type: { type: String, required: true },
    content: { type: String }
})

const Schedule = model<DBSchedule, DBScheduleModel>('Schedule', scheduleSchema);

export { Schedule };