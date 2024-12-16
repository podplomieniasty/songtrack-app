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

  constructor(private userService: UserService, public router: Router) {}

  create() {
    this.userService.createOrUpdate(this.credentials).subscribe((res) => {
      console.log('registered as: '+res);
      return res;
    });
    this.router.navigate(['/']);
  }
}
