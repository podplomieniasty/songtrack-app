import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {
  public filteredText: string = '';

  @Output() phrase = new EventEmitter<string>();
  
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filteredText = params['phrase'];
      this.sendFilter();
    })
  }

  sendFilter() {
    this.router.navigate(['/entries'], {
      queryParams: {
        phrase: this.filteredText
      }
    });
    this.phrase.emit(this.filteredText);
  }
}
