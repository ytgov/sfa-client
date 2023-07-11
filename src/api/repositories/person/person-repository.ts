import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import {ScalarResult} from "../../models/repository";
import {PersonAddressDTO} from "../../models";

export class PersonRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getPersonAddress(person_id?: number, address_type_id: number = 1): Promise<PersonAddressDTO> {
        let data: Partial<PersonAddressDTO> = {};

        if (person_id && address_type_id) {
            const result = await this.mainDb.raw(`SELECT * FROM sfa.fn_get_person_address(${person_id}, ${address_type_id});`);
            data = this.singleResult(result);
        }

        return data;
    }
}