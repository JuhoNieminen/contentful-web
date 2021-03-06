import { Component, EventEmitter, Input, OnInit, Output, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';
import { MenuItem, Menu } from '../../core/interfaces/menu.interface';
import { AsmEvent } from '../../core/interfaces/event.interface';

@Component({
  selector: 'asm-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  @Input() menu: [ Menu | MenuItem];
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  event: AsmEvent;

  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.data.event;
    this.renderer.addClass(document.body, 'mobile-menu-open');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'mobile-menu-open');
  }

  onCloseClick(): void {
    this.onClose.emit();
  }

  getUrl(item: MenuItem): string {
    return this.contentful.getUrl(item);
  }

  getLogo(): string {
    if (this.event && this.event.logo && this.event.logo.fields) {
      return this.event.logo.fields.file.url + '?w=300';
    }
  }

  onNavigation(item: MenuItem, event: Event) {
    this.contentful.onNavigation(item, event);
    this.onClose.emit();
  }

  onCollapse(item: MenuItem): void {
    item.show = !item.show;
  }
}
