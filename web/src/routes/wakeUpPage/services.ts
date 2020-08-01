export class WakeUp {
  private webSocket?: WebSocket;

  onMessage(msg: string) {}
  onClose() {}

  wakeUp() {
    const { host, hostname, protocol } = window.location;
    this.webSocket = new WebSocket(`ws://${host}/ws/serverWarkUp`);

    this.webSocket.onopen = () => {};
    this.webSocket.onmessage = e => {
      this.onMessage(e.data);
    };
    this.webSocket.onclose = e => {
      this.onClose();
    };
  }
}
