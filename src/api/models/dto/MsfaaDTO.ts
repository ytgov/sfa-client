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
}