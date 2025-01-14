import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [HttpClientModule, FormsModule, PopupComponent],
  providers: [UserService],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {

  popup = {
    msg: '',
    type: '',
  }

  public credentials = {
    name: '',
    password: ''
  }

  public logged?: boolean;
  public logout?: boolean;

  errorMessage: string = '';

  constructor(public userService: UserService, private router: Router) {

  }

  signIn() {
    const reg = '[^a-zA-Z0-9_]'
    const regex = new RegExp(reg);
    if(this.credentials.name === '' || this.credentials.password === '' || regex.test(this.credentials.name)) {
      this.errorMessage = "Błąd logowania. Formularz zawiera błędne wartości."
      return;
    }
    return this.userService.authenticate(this.credentials).subscribe((res: any) => {
      if(!res) {
        this.logged = false;
        this.errorMessage = 'Błąd walidacji.'
        return;
      } else {
        this.errorMessage = '';
        this.logout = false;
        this.credentials = {
          name: '',
          password: ''
        };
        this.router.navigate(['/']).then(() => {window.location?.reload()});
      }
    })
  }

  handlePopup(msg: string, type: string) {
    this.popup = {
      msg: msg,
      type: type,
    }
  }
}
