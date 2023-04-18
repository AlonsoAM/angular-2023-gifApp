import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      #sidebar {
        height: 100vh;
        width: 250px;
      }
    `,
  ],
})
export class SidebarComponent {}
