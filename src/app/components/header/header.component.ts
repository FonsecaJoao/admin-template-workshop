import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private mediaQuery = window.matchMedia('(min-width: 768px)');
  protected displayUserName = false;

  @Input() userInitials = 'JD';
  @Input() userName = 'John Doe';

  @Output() onMenuIconClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.displayUserName = this.mediaQuery.matches;
    this.mediaQuery.addEventListener('change', (ev: MediaQueryListEvent) => {
      this.displayUserName = ev.matches;
    });
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener(
      'change',
      (ev: MediaQueryListEvent) => {}
    );
  }
}
