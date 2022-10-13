import { model, Model, Schema } from "mongoose";

interface DBHistory {
    issued: Date;
    type: string;
    content: string;
};

interface DBCustomer {
    name: string;
    opened: Date;
    imageUrl: string;
    handler: string;
    handlerNum: string;
    paidSupport: boolean;
    supportHistory: Array<DBHistory>;
    license: Date;
};

interface DBCustomerModel extends Model<DBCustomer> {}

const customerSchema = new Schema<DBCustomer> ({
    name: { type: String, required: true, unique: 1 },
    opened: { type: Date, required: true },
    imageUrl: { type: String },
    handler: { type: String, required: true },
    handlerNum: { type: String },
    paidSupport: { type: Boolean, default: false },
    supportHistory: [{
        issued: { type: Date, required: true },
        type: { type: String },
        content: { type: String },
    }],
    license: { type: Date },
});

const Customer = model<DBCustomer, DBCustomerModel>('Customer', customerSchema);

export { Customer };