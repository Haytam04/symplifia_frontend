import { Invoice } from "./Invoice";

export class Resident {
    id!: number;
    fullName!: string;
    phoneNumber!: string;
    buildingName!: string;
    invoices!: Invoice[];
}