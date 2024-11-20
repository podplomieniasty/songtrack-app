import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-entry-view',
  standalone: true,
  imports: [],
  templateUrl: './single-entry-view.component.html',
  styleUrl: './single-entry-view.component.css'
})
export class SingleEntryViewComponent implements OnInit {
  spotifyId!: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.spotifyId = this.route.snapshot.paramMap.get('spotifyId')!;
  }
}
