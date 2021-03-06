import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  content: any = {};

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.route.data.subscribe((data: { content: any }) => {
      this.content = data.content || {};
    });
  }
}
