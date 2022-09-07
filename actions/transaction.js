import axios from "axios";

export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const VIEW_TRANSACTION = "VIEW_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const LIST_TRANSACTIONS = "LIST_TRANSACTIONS"; // done
export const DELETE_TRANSACTION = "DELETE+TRANSACTION";

const ROOT_URL = "http://127.0.0.1:8000/api/";

export async function getTransactionList(dispatch) {
  const response = await axios.get(`${ROOT_URL}transactions/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch({ type: LIST_TRANSACTIONS, payload: response });
}

export function viewTransaction(transactionId) {
  return async function transactionDetails(dispatch, getState) {
    const id = transactionId;
    const response = await axios.get(`${ROOT_URL}transactions/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: VIEW_TRANSACTION, payload: response.data });
  };
}

// export function createTransaction(transactionData) {
//   return async function createTransactionThunk(dispatch, getState) {
//     const data = transactionData;
//     const response = await axios.patch(`${ROOT_URL}tansactions/`, data);
//     dispatch({ type: UPDATE_TRANSACTION , payload: response.data});
//   };
// }
