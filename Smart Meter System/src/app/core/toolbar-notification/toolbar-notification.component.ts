import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'cdk-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
	cssPrefix = 'toolbar-notification';
  	isOpen: boolean = false;
  	@Input() notifications = [];

    // @HostListener('document:click', ['$event', '$event.target'])
    // onClick(event: MouseEvent, targetElement: HTMLElement) {
    //     if (!targetElement) {
    //           return;
    //     }
    //     const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    //     if (!clickedInside) {
    //          this.isOpen = false;
    //     }
    // }

  	constructor(private elementRef: ElementRef, public notif:NotificationsService) {

    }

  	ngOnInit() {
      this.notif.viewNotifications()
      .subscribe(data => {
        let result:any = data;
        this.notif.notificationContent = result;
        console.log(this.notif.notificationContent.status);
      });
      // this.concessionaire.fetchConcessionaires("Zamora")
      // .subscribe(data => {
      //   let res:any = data;
      //   this.notif.notificationContent = res;
      //   console.log(this.notif.notificationContent);
      // });
  	}

  	select() {

  	}

  	delete(notification) {

  	}

}
