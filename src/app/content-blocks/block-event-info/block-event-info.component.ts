import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-block-event-info',
  templateUrl: './block-event-info.component.html',
  styleUrls: ['./block-event-info.component.scss']
})
export class BlockEventInfoComponent implements OnInit {
  static blockName = 'BlockEventInfo';

  event: any = {};
  content: any = {};
  logo = '/assets/images/generic-event-logo.png';
  dates: string;
  place: string;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.parent ? this.route.snapshot.parent.data.event : null;
    if (this.event) {
      if (this.event.logo && this.event.logo.fields) {
        this.logo = this.event.logo.fields.file.url + '?w=700';
      } else {
        this.logo = '/assets/images/generic-event-logo.png';
      }
      this.place = this.event.eventPlace || 'TBA';
      this.dates = this.getEventDates();
    }
  }

  getEventDates(): string {
    const startTime = new Date(this.event.startDate);
    const endTime = new Date(this.event.endDate);
    let dates = startTime.getDate() + '.';

    if (startTime.getMonth() !== endTime.getMonth()) {
      dates += (startTime.getMonth() + 1) + '.';
    }

    dates += `-${endTime.getDate()}.${endTime.getMonth() + 1}.${endTime.getFullYear()}`;

    return dates;
  }
}
