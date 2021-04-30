import { FilteringPipe } from './filtering.pipe';
import {Session} from '../../models/session';
import {Account} from '../../models/account';
import * as uuid from 'uuid';

let sessions: Session[] = [];

describe('FilteringPipe', () => {
  beforeEach(() => {
    sessions = [];
    sessions.push(new Session(new Account('account1', 'eu-west-1'), uuid.v4()));
    sessions.push(new Session(new Account('account2', 'eu-west-1'), uuid.v4()));
    sessions.push(new Session(new Account('account3', 'eu-west-1'), uuid.v4()));
    sessions.push(new Session(new Account('account4', 'eu-west-1'), uuid.v4()));
    sessions.push(new Session(new Account('account5', 'eu-west-1'), uuid.v4()));

    sessions[1].active = true;
    sessions[2].active = true;
    sessions[4].active = true;
  });

  it('create an instance', () => {
    const pipe = new FilteringPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter active session when asked for true', () => {
    const pipe = new FilteringPipe();
    expect(sessions.length).toBe(5);
    sessions = pipe.transform(sessions, true);
    expect(sessions.length).toBe(3);
  });

  it('should filter not active session when asked for false', () => {
    const pipe = new FilteringPipe();
    expect(sessions.length).toBe(5);
    sessions = pipe.transform(sessions, false);
    expect(sessions.length).toBe(2);
  });
});