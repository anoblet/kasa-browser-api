import { on, off } from "./Plug";

export const schedule = (every, for_, device) => {
  let running = false;
  const checkMinutes = () => {
    if (!running) {
      const date = new Date();
      const minutes = date.getMinutes();
      console.log(`current minutes: ${minutes % every}`);
      if (minutes % every === 0) {
        console.log("turning on device");
        on(device);
        running = true;
        setTimeout(() => {
          console.log("turning off device");
          off(device);
          running = false;
        }, for_ * 60000);
      }
    }
    setTimeout(checkMinutes, 1000);
  };
  checkMinutes();
};
