export class Backup {
  private webSocket?: WebSocket;

  onMessage(msg: string) {}
  onClose() {}

  backup() {
    const { host, hostname, protocol } = window.location;
    this.webSocket = new WebSocket(`ws://${host}/ws/gitlabBackUp`);

    this.webSocket.onopen = () => {};
    this.webSocket.onmessage = e => {
      this.onMessage(e.data);
    };
    this.webSocket.onclose = e => {
      this.onClose();
    };
  }
}
