import * as device from './module/device';
import * as content from './module/content';
import * as school from './module/school';
import * as user from './module/user';
import * as sys from './module/sys';
import * as terminal from './module/terminal';
import * as portal from './module/portal';
import * as wx from './module/wx';
import * as works from './module/works';
import * as paper from './module/paper';
import * as score from './module/score';
export default {
  ...device,
  ...content,
  ...school,
  ...user,
  ...sys,
  ...terminal,
  ...portal,
  ...wx,
  ...works,
  ...paper,
  ...score
}
