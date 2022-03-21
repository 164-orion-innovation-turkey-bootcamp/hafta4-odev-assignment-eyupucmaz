import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: "root"
})
export class AlertService {

  constructor() {

  }

  small(icon: SweetAlertIcon, title: string) {
    let Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    return Toast.fire({
      icon,
      title
    })
  }


  success(title: string, message: string) {
    Swal.fire(title, message, "success")
  }
  error(title: string, message: string) {
    Swal.fire(title, message, "error")
  }
  warning(title: string, message: string) {
    Swal.fire(title, message, "warning")
  }
  info(title: string, message: string) {
    Swal.fire(title, message, "info")
  }
  question(title: string, message: string) {
    Swal.fire(title, message, "question")
  }
}