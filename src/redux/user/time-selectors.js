import { createSelector } from "reselect";

const selectTime = (state) => state.timer;

export const selectSeconds = createSelector([selectTime], (time) => time.s);
export const selectMinutes = createSelector([selectTime], (time) => time.m);
export const selectHours = createSelector([selectTime], (time) => time.h);
export const selectDays = createSelector([selectTime], (time) => time.d);
