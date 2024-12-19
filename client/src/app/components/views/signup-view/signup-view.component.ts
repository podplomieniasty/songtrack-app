import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-view',
  standalone: true,
  imports: [FormsModule],
  providers: [UserService],
  templateUrl: './signup-view.component.html',
  styleUrl: './signup-view.component.css'
})
export class SignupViewComponent {
  public credentials = {
    name: '',
    password: '',
  }
  errorMessage: string = '';

  constructor(private userService: UserService, public router: Router) {}

  create() {
    const reg = '[^a-zA-Z0-9_]'
    const regex = new RegExp(reg);
    if(this.credentials.name === '' || this.credentials.password === '') {
      this.errorMessage = 'Uzupełnij wszystkie pola formularza.';
      return;
    }
    if(regex.test(this.credentials.name)) {
      this.errorMessage = 'Nazwa użytkownika zawiera błędne znaki.';
      return;
    }
    if(this.credentials.password.length < 6) {
      this.errorMessage = 'Hasło musi zawierać minimum 6 znaków.';
      return;
    }
    this.errorMessage = "";
    this.userService.createOrUpdate(this.credentials).subscribe((res: any) => {
      if(res.code === 2137) {
        this.errorMessage = 'Użytkownik o takiej nazwie istnieje.';
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
