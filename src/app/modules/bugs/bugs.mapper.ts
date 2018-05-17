import { Bug } from "./models/bugs.model";

export class BugsMapper {

  static toView(bugFromServer: any): Bug {
    return { ...bugFromServer, userComments: bugFromServer.comments
    };
  }

  static toServer(bug: any): Bug {
    return {...bug, priority: +bug.priority };
  }
}
