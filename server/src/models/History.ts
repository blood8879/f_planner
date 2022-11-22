
import { model, Model, Schema } from "mongoose";

interface DBHistory {
    name: string
    issued: Date;
    type: string;
    content: string;
};

interface DBHistoryModel extends Model<DBHistory> {}

const historySchema = new Schema<DBHistory> ({
    name: { type: String, required: true },
    issued: { type: Date, required: true },
    type: { type: String, required: true },
    content: { type: String }
})

const History = model<DBHistory, DBHistoryModel>('History', historySchema);

export { History };