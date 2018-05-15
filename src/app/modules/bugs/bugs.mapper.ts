import { Bug } from "./models/bugs.model";

export class BugsMapper {

  static toView(bugFromServer: any): Bug {
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

  static toServer(bug: any): Bug {
    return {...bug, priority: +bug.priority };
  }
}
