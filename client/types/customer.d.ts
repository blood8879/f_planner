// 저장된 유저 타입
export type StoredCustomerType = {
    name: string;
    project: string;
    handler: string;
    handlerNum: string;
    paidSupport: boolean;
    opened: string;
    licenseExp: string;
    imageUrl: string;
    // supportHistory: string[] | null;
    licenseVolume: number;
}

// 유저 타입
export type CustomerType = {
    name: string;
    project: string;
    handler: string;
    handlerNum: string;
    paidSupport: boolean;
    opened: string | null;
    licenseExp: string | null;
    imageUrl: string;
    // supportHistory: string[] | null;
    licenseVolume: number;
}

