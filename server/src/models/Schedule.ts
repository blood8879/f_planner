
import { model, Model, Schema } from "mongoose";

interface DBSchedule {
    customer: string
    start: Date;
    type: string;
    content: string;
    title: string;
    name: string;
};

interface DBScheduleModel extends Model<DBSchedule> {}

const scheduleSchema = new Schema<DBSchedule> ({
    customer: { type: String, required: true },
    name: { type: String },
    title: { type: String },
    start: { type: Date, required: true },
    type: { type: String, required: true },
    content: { type: String }
})

const Schedule = model<DBSchedule, DBScheduleModel>('Schedule', scheduleSchema);

export { Schedule };