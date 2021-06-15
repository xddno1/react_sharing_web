import { INSERTADMINTOKEN, DELETEADMINTOKEN } from "../action-types";

const initstate = "";
export function admintoken(prestate = initstate, action) {
  switch (action.type) {
    case INSERTADMINTOKEN:
      return action.admintoken;
    case DELETEADMINTOKEN:
      return "";
    default:
      return prestate;
  }
}
