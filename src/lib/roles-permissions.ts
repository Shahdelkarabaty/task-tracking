import { userRole } from "@/models/auth.model";

export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type Permissions = {
    action: Action;
    resource: Resource;
  };

export enum Resource {
  TODOS = 'TODOS',
}


export const ROLES: Record<userRole, Permissions[]> = {
  [userRole.SUPER_ADMIN]: [
    { action: Action.CREATE, resource: Resource.TODOS },
    { action: Action.READ, resource: Resource.TODOS },
    { action: Action.UPDATE, resource: Resource.TODOS },
    { action: Action.DELETE, resource: Resource.TODOS },
  ],
  [userRole.ADMIN]: [
    { action: Action.CREATE, resource: Resource.TODOS },
    { action: Action.READ, resource: Resource.TODOS },
    { action: Action.UPDATE, resource: Resource.TODOS },
  ],
};
