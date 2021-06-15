import { INSERTADMINTOKEN, DELETEADMINTOKEN } from "../action-types";

export const actionInsertAdminToken = (admintoken) => ({
  type: INSERTADMINTOKEN,
  admintoken,
});
export const actionDeleteAdminToken = () => ({
  type: DELETEADMINTOKEN,
});
