import { INSERTUSERTOKEN, DELETEUSERTOKEN } from "../action-types";

export const actionInsertUserToken = (usertoken) => ({
  type: INSERTUSERTOKEN,
  usertoken,
});
export const actionDeleteUserToken = () => ({
  type: DELETEUSERTOKEN,
});
