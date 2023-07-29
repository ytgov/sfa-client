export interface MailAddressDTO {
    id?: number;
    person_id?: number;
    first_name?: string;
    last_name?: string;
    sex?: string;
    salut?: string;
    home_address1?: string;
    home_address2?: string;
    home_city_id?: number;
    home_city?: string;
    home_country_id?: number;
    home_country?: string;
    home_province_id?: number;
    home_province?: string;
    home_postal_code?: string;
    home_telephone?: string
    home_email?: string;
    mail_address1?: string;
    mail_address2?: string;
    mail_city_id?: number;
    mail_city?: string;
    mail_country_id?: number;
    mail_country?: string;
    mail_province_id?: number;
    mail_province?: string;
    mail_postal_code?: string;
    mail_telephone?: string;
    mail_email?: string;
}

export interface AddressLinesDTO {
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    salut?: string;
}