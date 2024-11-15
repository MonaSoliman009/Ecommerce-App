import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
export enum MessageType {
  Success,
  Error,
}
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  _messageAlert(messageType: MessageType, message: string) {
    switch (messageType) {
      case MessageType.Success:
      case MessageType.Error:
        this._messageSwal(messageType,message);
        break;
    }
  }

  private _messageSwal(messageType: number, message: string) {
    console.log(messageType);

    Swal.fire({
      icon:(messageType==0)?'success':"error",
      title: message,
      confirmButtonText: 'Close',
      timer: 1500,

    });

  }

  public messageConfirm(title: string, onDelete: Function) {
    Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: "#3085d6",

      cancelButtonText: 'Close',
      cancelButtonColor: "#d33",

    }).then((result) => {
      if (result.value) {
        onDelete();
      }
    });
  }
}
