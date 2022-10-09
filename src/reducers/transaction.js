import {
  LIST_TRANSACTIONS,
  VIEW_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../actions/transaction";

export function TransactionReducer(state = {}, action) {
  switch (action.type) {
    case LIST_TRANSACTIONS: {
      return { ...state, transactionList: action.payload };
    }
    case VIEW_TRANSACTION: {
      return { ...state, transactionDetails: action.payload };
    }
    // case UPDATE_TRANSACTION: {
    //   var index;
    //   // const transactionList = state.tansactions.transationList.data.results
    //   // transactionList.some((e) => {e.id === action.payload.id ?  index = (transactionList.indexOf(e)): ""})
    //   return {
    //     ...state,
    //     transactionList: {
    //       ...state,
    //       data: {
    //         ...state,
    //         results: state.transactions.transactionList.data.results
    //           .filter((item) => {
    //             return item.id !== action.payload.id;
    //           })
    //           .concat(action.payload),
    //       },
    //     },
    //   };
    // }
    default:
      return state;
  }
}
