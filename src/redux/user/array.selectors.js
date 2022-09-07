import { createSelector } from "reselect";
import { resetTodayIncome } from "./user.actions";
import { shortenBalance } from "../../utils/shortenAddress";

const selectArray = (state) => state.array;
const selectBoolean = (state) => state.boolean;

export const selectAccountArrayCount = createSelector([selectArray], (array) =>
  array.accountBalance.reduce((acc, balance) => {
    const displayBal = shortenBalance(balance);
    const displayAcc = shortenBalance(acc);
    return displayAcc + displayBal;
  }, 0)
);

export const selectCumIncomeCount = createSelector([selectArray], (array) =>
  array.cummulativeIncome.reduce((acc, balance) => {
    const displayBal = shortenBalance(balance);
    const displayAcc = shortenBalance(acc);
    return displayAcc + displayBal;
  }, 0)
);

export const selecttodayIncomeCount = createSelector([selectArray], (array) =>
  array.todayIncome.reduce((acc, balance, index, arr) => {
    if (arr.length === 24) {
      arr.length = 0;
      resetTodayIncome();
      return 0;
    } else if (selectBoolean.staked === false) {
      arr.length = 0;
      resetTodayIncome();
      return 0;
    } else {
      const displayBal = shortenBalance(balance);
      const displayAcc = shortenBalance(acc);
      return displayAcc + displayBal;
    }
  }, 0)
);
