import { Bugs } from "./models/bugs.model";

export class BugsMapper {

  static toView(bugFromServer: any): Bugs {
    return {
      id: bugFromServer.id,
      title: bugFromServer.title,
      description: bugFromServer.description,
      priority: bugFromServer.priority,
      reporter: bugFromServer.reporter,
      status: bugFromServer.status,
      createdAt: bugFromServer.createdAt,
      updatedAt: bugFromServer.updatedAt
    };
  }
}
