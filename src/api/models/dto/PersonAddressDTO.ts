export interface PersonAddressDTO {
    id?: number;
    person_id?: number;
    address_type_id?: number;
    address1?: string;
    address2?: string;
    city_id?: number;
    province_id?: number;
    country_id?: number;
    postal_code?: string;
    notes?: string;
    telephone?: string;
    email?: string;
    is_active?: boolean;
}