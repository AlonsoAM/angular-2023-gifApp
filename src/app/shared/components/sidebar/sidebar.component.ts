import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

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
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  search(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
