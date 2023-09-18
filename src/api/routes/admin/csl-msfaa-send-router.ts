import express, { Request, Response } from "express";
import knex from "knex";
import { param } from "express-validator";
import { DB_CONFIG } from "../../config";
import moment from "moment";

const db = knex(DB_CONFIG);

export const cslMsfaaSendRouter = express.Router();

cslMsfaaSendRouter.get(
  "/:EXPORT_DATE/:SEQ_NUM/:FLAG",
  [param("FLAG").notEmpty()],
  async (req: Request, res: Response) => {
    let { EXPORT_DATE, SEQ_NUM, FLAG } = req.params;
    try {
      let v_filename;
      let v_send_date;
      let v_send_time;
      let v_out_record;
      let v_count = 0;
      let v_total_sin = 0;
      let v_mailing_address1;
      let v_mailing_address2;
      let v_mailing_city;
      let v_mailing_province;
      let v_home_province;
      let v_mailing_phone;
      let v_mailing_postal_code;
      let v_home_postal_code;
      let v_mailing_country;
      let v_mailing_email;
      let v_home_phone;
      let v_email_sent = "No Emails sent.";
      let okMessage;
      let badMessage;

      let nextValObj = await db.select(db.raw(`NEXT VALUE FOR sfa.msfaa_sent_seq AS nextVal;`));
      let nextVal = nextValObj[0].nextVal;
      v_send_date = moment(new Date()).format("YYYYMMDD");
      v_send_time = moment(new Date()).format("HHmm");

      v_filename = "PPYT.EDU.MSFA.SENT." + v_send_date + nextVal;

      v_out_record =
        "100YT  " + "MSFAA SENT".padEnd(40, " ") + v_send_date + v_send_time + nextVal.padStart(6, "0") + " " + "\n";

      let msfaa_view_select_pre = db("sfa.vw_msfaa_send").select(
        db.raw("'200' as record_type"),
        "agreement_num_init",
        "agreement_number",
        "sin",
        db.raw("'P' as status_code"),
        "institution_code",
        "date_of_birth",
        "date_produced",
        "last_name",
        "first_name",
        "initials",
        "gender",
        "marital_status",
        "home_address1",
        "home_address2",
        "home_city",
        "home_province",
        "home_province_id",
        "home_postal_code",
        "home_country",
        "home_phone",
        "home_email",
        "mailing_address1",
        "mailing_address2",
        "mailing_city",
        "mailing_province",
        "mailing_province_id",
        "mailing_postal_code",
        "mailing_country",
        "school_phone",
        "school_email",
        "sent_date",
        "sent_seq_number",
        "part_full_time"
      );

      if (FLAG === "0") {
        msfaa_view_select_pre.whereNull("sent_date").andWhere("msfaa_status", "=", "Pending");
      } else {
        msfaa_view_select_pre
          .where("sent_date", "=", moment(EXPORT_DATE).format("YYYY-MM-DD"))
          .andWhere("sent_seq_number", "=", SEQ_NUM)
          .andWhere("msfaa_status", "=", "Pending");
      }

      let msfaa_view_select = await msfaa_view_select_pre;

      if (msfaa_view_select.length == 0) {
        badMessage = " There are no MSFAAs to Send, Header and Trailer still written";
      }

      console.log("HERE 1");

      if (msfaa_view_select.length == 0) {
        badMessage = " There are no MSFAAs to Send, Header and Trailer still written";
      }

      for (let col of msfaa_view_select) {
        v_home_phone = (col.home_phone || "")
          .replace(/-/g, "")
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .replace(/ /g, "")
          .replace(/\./g, "")
          .replace(/\+/g, "");

        v_mailing_phone = (col.school_phone || "")
          .replace(/-/g, "")
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .replace(/ /g, "")
          .replace(/\./g, "")
          .replace(/\+/g, "");

        v_home_province = col.home_province;
        v_home_postal_code = col.home_postal_code;

        // if no mailing address, default to home address
        if (!col.mailing_address1) {
          v_mailing_address1 = col.home_address1;
          v_mailing_address2 = col.home_address2;
          v_mailing_city = col.home_city;
          v_mailing_province = v_home_province;
          v_mailing_postal_code = v_home_postal_code;
          v_mailing_phone = v_mailing_phone;
          v_mailing_country = col.home_country;
          v_mailing_email = col.home_email;
        } else {
          v_mailing_address1 = col.mailing_address1;
          v_mailing_address2 = col.mailing_address2;
          v_mailing_city = col.mailing_city;
          v_mailing_province = col.mailing_province;
          v_mailing_postal_code = col.mailing_postal_code;
          v_mailing_country = col.mailing_country;
          v_mailing_email = col.school_email;
        }

        v_out_record =
          v_out_record +
          "200" +
          padStartToMax(col.agreement_num_init, "0", 1) +
          padStartToMax(col.agreement_number, "0", 9) +
          padEndToMax(col.sin, " ", 9) +
          padEndToMax(col.status_code, " ", 1) +
          padEndToMax(col.institution_code, " ", 4) +
          padStartToMax(col.date_of_birth, "0", 8) +
          padStartToMax(col.date_produced, "0", 8) +
          padEndToMax(col.last_name, " ", 25) +
          padEndToMax(col.first_name, " ", 15) +
          padEndToMax(col.initials, " ", 3) +
          padEndToMax(col.gender, " ", 1) +
          padEndToMax(col.marital_status, " ", 1) +
          padEndToMax(v_mailing_address1, " ", 40) +
          padEndToMax(v_mailing_address2, " ", 40) +
          padEndToMax(v_mailing_city, " ", 25) +
          padEndToMax(v_mailing_province, " ", 4) +
          padEndToMax(v_mailing_postal_code, " ", 16) +
          padEndToMax(v_mailing_country, " ", 20) +
          padStartToMax(v_mailing_phone, "0", 20) +
          padEndToMax(v_mailing_email, " ", 70) +
          padEndToMax(col.home_address1, " ", 40) +
          padEndToMax(col.home_address2, " ", 40) +
          padEndToMax(col.home_city, " ", 25) +
          padEndToMax(v_home_province, " ", 4) +
          padEndToMax(v_home_postal_code, " ", 16) +
          padEndToMax(col.home_country, " ", 20) +
          padStartToMax(v_home_phone, "0", 20) +
          padEndToMax(col.part_full_time, "FT", 2) +
          " " +
          "\n";

        v_count = v_count + 1;
        v_total_sin = v_total_sin + Number(col.sin ? col.sin : 0);

        if (FLAG === "0") {
          await db.raw(`EXEC sfa.sp_update_msfa_send ${nextVal}, ${col.agreement_number ? col.agreement_number : -1};`);
        } else {
          let sp_msfaa_send = await db.raw(
            `EXEC sfa.sp_update_date_msfa_send ${nextVal}, '${moment(v_send_date, "YYYYMMDD").format("YYYY-MM-DD")}', ${
              col.agreement_number ? col.agreement_number : -1
            };`
          );
        }
      }

      if (FLAG === "0") {
        await db.raw(`EXEC sfa.sp_insert_communication_log_from_msfaa ${SEQ_NUM}`);
      }

      v_out_record =
        v_out_record +
        "999" +
        "MSFAA SENT".padEnd(40, " ") +
        String(v_count).padStart(9, "0") +
        String(v_total_sin).padStart(15, "0") +
        " ".padEnd(533, " ");

      await db.raw(
        `EXEC sfa.sp_update_system_parameter_send '${moment(new Date()).format("YYYY-MM-DD HH:ss")}', ${nextVal};`
      );

      okMessage = "MSFAA export complete. " + v_filename + " has been saved.  " + v_email_sent;

      //nextVal = await db.select(db.raw(`NEXT VALUE FOR sfa.msfaa_sent_seq AS nextVal;`));
      EXPORT_DATE = "";

      return res.json({
        flag: !badMessage ? 1 : 0,
        data: v_out_record,
        message: (badMessage ? badMessage + ". " : "") + okMessage,
        filename: v_filename,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(404).send();
    }
  }
);

function padEndToMax(input: any, padder: string, max: number) {
  input = `${input || ""}`.trim();
  input = input.padEnd(max, padder);
  return input.substring(0, max);
}

function padStartToMax(input: any, padder: string, max: number) {
  input = `${input || ""}`.trim();
  input = input.padStart(max, padder);
  return input.substring(0, max);
}
