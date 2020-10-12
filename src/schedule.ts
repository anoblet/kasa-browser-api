import { on, off } from "./plug";

export const schedule = (interval, duration, device) => {
  let running = false;
  const checkMinutes = () => {
    if (!running) {
      const date = new Date();
      const minutes = date.getMinutes();
      if (minutes % interval === 0) {
        on(device);
        running = true;
        setTimeout(() => {
          off(device);
          running = false;
        }, duration * 60000);
      }
    }
    setTimeout(checkMinutes, 1000);
  };
  checkMinutes();
};

export class Schedule {
  device: any;
  duration: number;
  interval: number;
  isActive: boolean = false;
  offTimer: any;
  onPoll: any;
  pollCallback: any;
  pollTimer: any;
  timeUntil: number;
  timeLeft: number;

  constructor({ device, duration, interval, onPoll, pollCallback }) {
    this.device = device;
    this.duration = duration;
    this.interval = interval;
    this.onPoll = onPoll;
    this.pollCallback = pollCallback;
    this.poll();
  }

  poll() {
    if (!this.isActive) {
      if (new Date().getMinutes() % this.interval === 0) {
        // Reset time left
        this.timeLeft = this.duration * 60;
        // Turn on the device
        on(this.device);
        // Set status to active
        this.isActive = true;
        this.offTimer = setTimeout(() => {
          off(this.device);
          this.isActive = false;
        }, this.duration * 60000);
      }
    }
    this.onPoll({ timeLeft: this.timeLeft });
    this.pollCallback({ timeLeft: this.timeLeft });
    this.timeLeft !== 0 && this.timeLeft--;
    this.pollTimer = setTimeout(() => this.poll(), 1000);
  }

  reset() {
    clearTimeout(this.pollTimer);
    clearTimeout(this.offTimer);
  }
}
