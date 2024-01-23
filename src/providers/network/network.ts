import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NetworkProvider {
  constructor(public http: HttpClient) {}

  save_add_case(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_add_case.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  upload_p_file(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/upload_p_file.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  send_pic_request(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/send_pic_request.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_AD_section1_info_sql(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_AD_section1_info_sql.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  upload_AD_S1_file(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/upload_AD_S1_file.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_opnion_sql_and_email(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_opnion_sql_and_email.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_check_sql(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_check_sql.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  upload_report(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/upload_report.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  download_PreDesign_report(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/download_PreDesign_report.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  upload_complete_file(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/upload_complete_file.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  download_complete_file_one(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/download_complete_file_one.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  download_complete_file_all(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/download_complete_file_all.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_complete_file_check_sql(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_complete_file_check_sql.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_case_edit(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_case_edit.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_assign_setting(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_assign_setting.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  update_mail_receiver(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/update_mail_receiver.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_receive_status(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_receive_status.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_receive_status_list(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_receive_status_list.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_status_s5(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_status_s5.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_client_contact_gs(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_client_contact_gs.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_section_note(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_section_note.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  delete_sql_client(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/delete_sql_client.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_add_sql_client(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_add_sql_client.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_edit_sql_client(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_edit_sql_client.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_case_auth(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_case_auth.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_other_work(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_other_work.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  download_pic_zip(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/download_pic_zip.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  report_main(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/report_main.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  re_upload_pic(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/re_upload_pic.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_close(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_close.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  send_paper_mail(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/send_paper_mail.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  send_paper_mail1(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/send_paper_mail1.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  send_paper_mail2(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/send_paper_mail2.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_callback_file(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_callback_file.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  delete_callback_file(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/delete_callback_file.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  delete_callback_pic(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/delete_callback_pic.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  delete_case(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/delete_case.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  get_vertify(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/get_vertify.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  confirm_change_password(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/confirm_change_password.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  worker_save_edit_pic(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_save_edit_pic.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_apply_tab1_add(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_apply_tab1_add.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_apply_tab1_edit(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_apply_tab1_edit.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  save_apply_tab1_delete(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/save_apply_tab1_delete.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }

  // 我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線我是分隔線

  // 讀取 各階段之項目資訊 && 各項目之任務資訊
  readDistributionAllData(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_distribution_all_data.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  addNewProject(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/add_mission_data.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  updateMissionData(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/update_mission_data.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
  // Excel上傳檔案
  uploadExcelFile(formdata: any) {
    let url: string =
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/upload_excel_file.php";
    let request = this.http.post(url, formdata);
    return request.toPromise();
  }
}
