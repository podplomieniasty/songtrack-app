import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [UserService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() onNewItem: EventEmitter<boolean> = new EventEmitter();
  isLogged: boolean = false;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.userService.isLoggedIn();
  }

  toggleModalOpening = (): void => {
    this.onNewItem.emit(true);
  }

  logout() {
    this.userService.logout().subscribe((res: any) => {
      console.log('Succesfully logout!');
      this.router.navigate(['/']);
      window.location?.reload();
    })
  }
}
