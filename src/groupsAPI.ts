import { GetGroupsResponse } from "./models/interfaces";
import groups from "./assets/groups.json";

// A mock function to mimic making an async request for data
export const fetchGroups = () => {
  return new Promise<GetGroupsResponse>((resolve) =>
    setTimeout(() => resolve({ result: 1, data: groups }), 1000),
  );
};
