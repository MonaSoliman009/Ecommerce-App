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
}
