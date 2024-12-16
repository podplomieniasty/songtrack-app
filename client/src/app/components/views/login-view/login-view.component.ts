import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [UserService],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  public credentials = {
    name: '',
    password: ''
  }

  public logged?: boolean;
  public logout?: boolean;

  constructor(public userService: UserService, private router: Router) {

  }

  signIn() {
    return this.userService.authenticate(this.credentials).subscribe((res) => {
      if(!res) {
        this.logged = false;
      } else {
        this.logout = false;
        this.credentials = {
          name: '',
          password: ''
        };
        this.router.navigate(['/']).then(() => {window.location?.reload()});
      }
    })
  }
}
