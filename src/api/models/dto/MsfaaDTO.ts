export interface MsfaaDTO {
    id?: number;
    application_id?: number;
    student_id?: number;
    sent_date?: Date;
    signed_date?: Date;
    received_date?: Date;
    cancel_date?: Date;
    msfaa_status?: string;
    cancel_reason?: string;
    sent_seq_number?: number;
    last_reminder_sent?: number;
    is_full_time?: boolean;
    email?: string;
    rec_create_date?: Date;
    rec_last_mod_date?: Date;
}

export type MsfaaTable = Omit<MsfaaDTO, "id">;

export const msfaaColumns: (keyof MsfaaTable)[] = [
    "application_id",
    "student_id",
    "sent_date",
    "signed_date",
    "received_date",
    "cancel_date",
    "msfaa_status",
    "cancel_reason",
    "sent_seq_number",
    "last_reminder_sent",
    "is_full_time",
    "email",
    "rec_create_date",
    "rec_last_mod_date"
];