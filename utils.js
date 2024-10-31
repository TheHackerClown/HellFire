class Hellfire {
    constructor(config) {
        this.ws = new WebSocket(config.url);
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({code:400,data:"ipconfig"}))
        }
    }
}