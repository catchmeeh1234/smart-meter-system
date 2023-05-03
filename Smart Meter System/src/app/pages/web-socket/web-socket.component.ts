import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

const WEBSOCKET_URL = 'ws://localhost:4300';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.scss']
})
export class WebSocketComponent implements OnInit {
  public messages: string[] = [];
  public message: string = '';

  constructor(private websock:WebSocketService) {

  }

  // sendMessage() {
  //   this.socket.emit('message', this.message);
  //   this.message = '';
  // }

  ngOnInit(): void {
    this.websock.closeSocket();
    this.websock.openSocket();
  }

  onSend() {
    //this.websock.sendNotif();
    // const query = 'SELECT * FROM UserAccounts';

    // this.socket.emit('message', query);

    // const text = <HTMLInputElement>document.querySelector('#inputText');

    // this.socket.emit('message', text.value);
  }
}
