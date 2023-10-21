import http from "@/services/http-service";
import { APP_HOST, LS_TOKEN, LS_SESSION } from "@/constants";
import { getAccountID } from "@/services/account-service";
import { LS_ACCOUNT } from "@/constants";

const createAuthToken = async () => {
  try {
    const res = await http.get("/authentication/token/new");
    if (res.data.success) {
      window.localStorage.setItem("req_token", res.data.request_token);
      window.location.replace(
        `https://www.themoviedb.org/authenticate/${res.data.request_token}?redirect_to=${APP_HOST}`
      );
      return res;
    }
    throw new Error("Failed to create token");
  } catch (err) {
    console.log(err);
  }
};

export const setApiAuth = async (shouldReset = false) => {
  const ls = window.localStorage;
  if (shouldReset || ls.getItem(LS_SESSION) === "undefined") {
    ls.removeItem(LS_SESSION);
    ls.removeItem(LS_TOKEN);
  }

  try {
    if (ls.getItem(LS_SESSION)) return new Error('A session already exists');

    const request_token = ls.getItem(LS_TOKEN);
    if (!request_token) {
      await createAuthToken();
      return;
    }
    const res = await http.get("/authentication/session/new", {
      params: { request_token },
    });
    if (res.data.success) {
      ls.setItem(LS_SESSION, res.data.session_id);
      const account_id = await getAccountID();
      ls.setItem(LS_ACCOUNT, account_id);
      return;
    }
    throw new Error("Failed to set API authentication");
  } catch (err) {
    console.log(err);
  }
};
