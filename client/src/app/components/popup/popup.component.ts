import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  @Input() message!: any;
  @Input() state!: string;
  isVisible: boolean = false;
  innerStyle: string = '';
  innerMessage: string = '';

  ngOnInit(): void {
    if(this.message.msg === '') {
      return;
    }
    switch(this.message.type) {
      case 'SUCCESS': this.innerStyle = 'green'; break;
      case 'ALERT': this.innerStyle = 'yellow'; break;
      case 'FAIL': this.innerStyle = 'red'; break;
      default: this.innerStyle = ''; break;
    }
    console.log('FIRED');
  }
}
