import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
})
export class NoResultsComponent implements OnInit {
  @Input() navOpened = false;
  @Input() title = '';
  @Input() description = '';
  @Input() imagePath = '';

  constructor() {}

  ngOnInit(): void {}
}
