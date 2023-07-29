import { Knex } from "knex";
import { AddressLinesDTO, StudentDTO, MailAddressDTO } from "models";
import { BaseRepository } from "../base-repository"

export class StudentRepository extends BaseRepository {
    private student: StudentDTO = {} as StudentDTO;

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
        
    async getStudentCategoryId(desc: string): Promise<number> {
        return await this.getScalarValue<number>("fn_get_student_category_id", [desc]);
    }

    async getStudentById(student_id?: number): Promise<StudentDTO> {

        if (student_id) {
            this.student = await this.mainDb("sfa.student")
                .select("*")
                .where({ id: student_id })
                .first();
        }

        return this.student;
    }

    async getAddressText(student_id?: number, application_id?: number): Promise<string> {
        if (student_id && application_id) {
            return this.getScalarValue<string>("fn_get_student_address", [student_id, application_id]);
        }
        return "";
    }

    async getMailAddress(student_id?: number): Promise<MailAddressDTO> {
        let result: Partial<MailAddressDTO> = {};

        if (student_id) {
            result = await this.mainDb.raw(`SELECT * FROM sfa.fn_get_mail_address(${student_id})`);
            if (Array.isArray(result)) {
                result = result[0];
            }
        }

        return result;
    }

    async getMailAddressSP(student_id?: number, address_select?: string): Promise<AddressLinesDTO> {
        let result: Partial<AddressLinesDTO> = {};

        const mailAddress = await this.getMailAddress(student_id);

        result.salut = mailAddress.first_name;
        result.address1 = `${mailAddress.salut}${mailAddress.first_name} ${mailAddress.last_name}`;

        const assignLines = (ma: MailAddressDTO, type: string) => {
            result.address2 = ma[`${type}_address1` as keyof MailAddressDTO] as string;

            if (ma[`${type}_address2` as keyof MailAddressDTO]) {
                result.address3 = ma[`${type}_address2` as keyof MailAddressDTO] as string;

                if (ma[`${type}_city` as keyof MailAddressDTO] || ma[`${type}_province` as keyof MailAddressDTO]) {
                    if (ma[`${type}_city` as keyof MailAddressDTO] && ma[`${type}_province` as keyof MailAddressDTO]) {
                        result.address4 = `${ma[`${type}_city` as keyof MailAddressDTO]}, ${ma[`${type}_province` as keyof MailAddressDTO]}`;
                    }
                    else if (!ma[`${type}_province` as keyof MailAddressDTO]) {
                        result.address4 = ma[`${type}_city` as keyof MailAddressDTO] as string;
                    }
                    else if (!ma[`${type}_city` as keyof MailAddressDTO]) {
                        result.address4 = ma[`${type}_province` as keyof MailAddressDTO] as string;
                    }

                    if (ma[`${type}_country` as keyof MailAddressDTO] || ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                        if (ma[`${type}_country` as keyof MailAddressDTO] && ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address5 = `${ma[`${type}_country` as keyof MailAddressDTO]}, ${ma[`${type}_postal_code` as keyof MailAddressDTO]}`;
                        }
                        else if (!ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address5 = ma[`${type}_country` as keyof MailAddressDTO] as string;
                        }
                        else if (!ma[`${type}_country` as keyof MailAddressDTO]) {
                            result.address5 = ma[`${type}_postal_code` as keyof MailAddressDTO] as string;
                        }
                    }                    
                }
                else {
                    if (ma[`${type}_country` as keyof MailAddressDTO] || ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                        if (ma[`${type}_country` as keyof MailAddressDTO] && ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address4 = `${ma[`${type}_country` as keyof MailAddressDTO]}, ${ma[`${type}_postal_code` as keyof MailAddressDTO]}`;
                        }
                        else if (!ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address4 = ma[`${type}_country` as keyof MailAddressDTO] as string;
                        }
                        else if (!ma[`${type}_country` as keyof MailAddressDTO]) {
                            result.address4 = ma[`${type}_postal_code` as keyof MailAddressDTO] as string;
                        }
                    }
                    else {
                        result.address4 = undefined;
                    }
                }

                result.address5 = undefined;
            }
            else {
                if (ma[`${type}_city` as keyof MailAddressDTO] || ma[`${type}_province` as keyof MailAddressDTO]) {
                    if (ma[`${type}_city` as keyof MailAddressDTO] && ma[`${type}_province` as keyof MailAddressDTO]) {
                        result.address3 = `${ma[`${type}_city` as keyof MailAddressDTO]}, ${ma[`${type}_province` as keyof MailAddressDTO]}`;
                    }
                    else if (!ma[`${type}_province` as keyof MailAddressDTO]) {
                        result.address4 = ma[`${type}_city` as keyof MailAddressDTO] as string;
                    }
                    else if (!ma[`${type}_city` as keyof MailAddressDTO]) {
                        result.address4 = ma[`${type}_province` as keyof MailAddressDTO] as string;
                    }

                    if (ma[`${type}_country` as keyof MailAddressDTO] || ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                        if (ma[`${type}_country` as keyof MailAddressDTO] && ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address4 = `${ma[`${type}_country` as keyof MailAddressDTO]}, ${ma[`${type}_postal_code` as keyof MailAddressDTO]}`;
                        }
                        else if (!ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address4 = ma[`${type}_country` as keyof MailAddressDTO] as string;
                        }
                        else if (!ma[`${type}_country` as keyof MailAddressDTO]) {
                            result.address4 = ma[`${type}_postal_code` as keyof MailAddressDTO] as string;
                        }
                    }                    
                }
                else {
                    if (ma[`${type}_country` as keyof MailAddressDTO] || ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                        if (ma[`${type}_country` as keyof MailAddressDTO] && ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address3 = `${ma[`${type}_country` as keyof MailAddressDTO]}, ${ma[`${type}_postal_code` as keyof MailAddressDTO]}`;
                        }
                        else if (!ma[`${type}_postal_code` as keyof MailAddressDTO]) {
                            result.address3 = ma[`${type}_country` as keyof MailAddressDTO] as string;
                        }
                        else if (!ma[`${type}_country` as keyof MailAddressDTO]) {
                            result.address3 = ma[`${type}_postal_code` as keyof MailAddressDTO] as string;
                        }
                    }
                    else {
                        result.address3 = undefined;
                    }
                    result.address4 = undefined;
                    result.address5 = undefined;
                }
            }
        };

        if (address_select === "SCHOOL") {
            assignLines(mailAddress, "mail");
        }
        else {
            assignLines(mailAddress, "home");
        }
        
        return result;
    }
}