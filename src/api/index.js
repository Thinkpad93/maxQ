import * as device from './module/device';
import * as content from './module/content';
import * as school from './module/school';
import * as user from './module/user';
export default {
  ...device,
  ...content,
  ...school,
  ...user
}
