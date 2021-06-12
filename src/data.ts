export enum Stage {
  ResponseComplete = "ResponseComplete"
}

export interface User {
  username: string;
}

export interface Entry {
  stage: Stage;
  verb: string;
  user: User;
}
