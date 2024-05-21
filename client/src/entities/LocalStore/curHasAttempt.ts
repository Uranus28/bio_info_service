export const CUR_HAS_ATTEMP_STORAGE  = "curHasAttempt";

export const getCurHasAttempt = () => localStorage.getItem(CUR_HAS_ATTEMP_STORAGE);
export const setCurHasAttempt = (token: string | null) =>
  token
    ? localStorage.setItem(CUR_HAS_ATTEMP_STORAGE, token)
    : localStorage.removeItem(CUR_HAS_ATTEMP_STORAGE);
export const clearCurHasAttempt = () => localStorage.removeItem(CUR_HAS_ATTEMP_STORAGE);
