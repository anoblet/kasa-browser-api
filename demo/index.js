import {
  login,
  schedule,
} from "../dist/index.js";
import { on, off, state, toggle } from "../dist/plug.js";

(async () => {
  const device = await login("andrewbnoblet@gmail.com", "NzwxJJ*2fS_bRkY").then(
    ({ devices }) => devices[1]
  );
  schedule(30, 5, device);
})();
