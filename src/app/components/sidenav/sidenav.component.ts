import { Component, OnInit } from '@angular/core';

interface Item {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  protected openSideNav = false;
  protected menuItemList: Item[] = [
    { icon: 'assets/icons/project.svg', name: 'Projects' },
    { icon: 'assets/icons/menu-options.svg', name: 'Menu' },
    { icon: 'assets/icons/gateway.svg', name: 'Gateways' },
    { icon: 'assets/icons/chart.svg', name: 'Reports' },
    { icon: 'assets/icons/logout.svg', name: 'Logout' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onMenuIconClick(): void {
    this.openSideNav = !this.openSideNav;
  }
}
