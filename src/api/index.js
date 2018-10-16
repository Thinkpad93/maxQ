import * as device from './module/device';
import * as content from './module/content';
import * as school from './module/school';
import * as user from './module/user';
import * as sys from './module/sys';
import * as terminal from './module/terminal';
export default {
  ...device,
  ...content,
  ...school,
  ...user,
  ...sys,
  ...terminal
}
