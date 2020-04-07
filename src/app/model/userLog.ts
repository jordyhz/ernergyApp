import {User} from './user';

export interface UserLog {
  user: User;
  sourceIp: string;
  loginDateTime: string;
  logoutDateTime: string;
}
