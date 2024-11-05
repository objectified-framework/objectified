import {DaoUtils} from "../generated/dao";
import { v4 as uuid } from 'uuid';

/**
 * This SessionManager class is used to manage the session state for users.  Session data is stored in the database.
 */
export class SessionManager {
  private static instance: SessionManager;
  private db = DaoUtils.getDatabase();

  private constructor() { }

  /**
   * Retrieves the static instance of this class.
   */
  public static getInstance() {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }

    return SessionManager.instance;
  }

  /**
   * Deletes a session from the database.
   *
   * @param sessionId {string} The session ID to delete.
   */
  public async deleteSession(sessionId: string) {
    const sql = 'DELETE FROM obj.session WHERE session_id=$[sessionId]';

    await this.db.none(sql, { sessionId });
  }

  /**
   * Updates the session data in the database.
   *
   * @param sessionId {string} The session ID to update.
   * @param data {any} The new data to store in the session.
   */
  public async updateSession(sessionId: string, data: any) {
    const sql = 'UPDATE obj.session SET data=$[data], session_time=$[session_time] WHERE session_id=$[sessionId]';

    await this.db.none(sql, { sessionId, session_time: new Date().getTime(), data });
  }

  /**
   * Refreshes the session time in the database.
   *
   * @param sessionId {string} The session ID to refresh.
   * @private
   */
  private async refreshSession(sessionId: string) {
    const sql = 'UPDATE obj.session SET session_time=$[session_time] WHERE session_id=$[sessionId]';

    await this.db.none(sql, { sessionId, session_time: new Date().getTime() });
  }

  /**
   * Creates a new session in the database.
   *
   * @param userId {string} The user ID to associate with the session.
   * @param data {any} The data to store in the session.
   */
  public async createSession(userId: string, data: any): Promise<string> {
    const sql = 'INSERT INTO obj.session (user_id, session_id, data, session_time) VALUES ($[userId], $[sessionId], $[data], $[session_time])';
    const sessionId = uuid();

    await this.db.none(sql, { userId, sessionId, session_time: new Date().getTime(), data });

    return sessionId;
  }

  /**
   * Retrieves the session data from the database.
   *
   * @param sessionId {string} The session ID to retrieve.
   * @returns {Promise<any>} The session data.
   */
  public async getSession(sessionId: string): Promise<any> {
    const sql = 'SELECT * FROM obj.session WHERE session_id=$[sessionId]';
    const results = await this.db.oneOrNone(sql, { sessionId });
    const timeout = results['session_time'] + results['session_timeout'];

    if (timeout > new Date().getTime()) {
      await this.refreshSession(sessionId);
      return results['data'];
    }

    await this.deleteSession(sessionId);

    throw new Error('Session has expired');
  }

}