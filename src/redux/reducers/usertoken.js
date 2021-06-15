import { INSERTUSERTOKEN, DELETEUSERTOKEN } from "../action-types";

const initstate = "";
export function usertoken(prestate = initstate, action) {
  switch (action.type) {
    case INSERTUSERTOKEN:
      return action.usertoken;
    case DELETEUSERTOKEN:
      return "";
    default:
      return prestate;
  }
}
