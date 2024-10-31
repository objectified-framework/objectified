import {DaoUtils} from "../generated/dao/DaoUtils";
import pgPromise from "pg-promise";

export class SessionUtil {

  constructor(private db: pgPromise.IDatabase<any> = DaoUtils.getDatabase()) {}

  async getSession(sessionId: string): Promise<any> {
    // TODO: Refresh session
    // Return data

    return null;
  }

  async deleteSession(sessionId: string): Promise<void> {
    // TODO: Delete session
  }

  async createSession(userId: number, data?: any): Promise<string> {
    // TODO: Create a new session for the given user ID
    // Return the session ID

    return null;
  }

}