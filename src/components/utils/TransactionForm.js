// import React from "react";
// import MenuItem from "@mui/material/MenuItem";
// import FormStack from "../utils/FormStack";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { purpleButton, CancelButton, deleteButton } from "../utils/Button";
// import Box from "@mui/material/Box";
// import { axiosInstance } from "./AxiosInstance";
// import { useNavigate, useLocation } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import IconButton from "@mui/material/IconButton";

// const receiveGiveFormData = {
//   status: "",
//   bank_name: "",
//   account_name: "",
//   currency: "",
//   cash: 0.0,
//   mode: "",
//   transfer: 0.0,
//   cash_rate: 0.0,
//   transfer_rate: 0.0,
//   selling_rate: 0.0,
// };

// const beneficiaryFormData = {
//   customer_account_name1: "",
//   customer_account_number1: "",
//   customer_bank_name1: "",
//   transfer_amount2: 0.0,
//   customer_account_name2: "",
//   customer_account_number2: "",
//   customer_bank_name2: "",
//   transfer_amount2: 0.0,
// };

// export default function TransactionForm(props) {
//   const navigate = useNavigate();
//   const currentUrl = useLocation();
//   const [station, setStation] = React.useState(getStation(currentUrl));
//   const [value, setValue] = React.useState(props.data);
//   const [use, setUse] = React.useState(props.use);
//   const [receiveGive, setReceiveGive] = React.useState([]);
//   const [receiveGiveForm, setReceiveGiveForm] =
//     React.useState(receiveGiveFormData);

//   const [beneficiaries, setBeneficiaries] = React.useState([
//     beneficiaryFormData,
//   ]);
//   // const [firstBeneficiaryForm, setFirstBeneficiaryForm] =
//   //   React.useState(beneficiaryFormData);
//   // const [secondBeneficiaryForm, setSecondBeneficiaryForm] =
//   //   React.useState(beneficiaryFormData);

//   function getStation(currentUrl) {
//     switch (currentUrl.pathname.split("/")[1]) {
//       case "frontdesk":
//         return "FRONTDESK";
//       case "online":
//         return "ONLINE";
//       case "bank":
//         return "BANK";
//       case "marketing":
//         return "MARKETING";
//     }
//   }

//   const num = [
//     "cash",
//     "transfer",
//     "transfer_rate",
//     "cash_rate",
//     "selling_rate",
//     "transfer_amount1",
//     "transfer_amount2",
//   ];

//   const handleChange = (event) => {
//     const val = event.target.value;
//     const key = event.target.name;
//     setValue((prevState) => {
//       return { ...prevState, [key]: val };
//     });
//   };

//   const handleReceiveGiveForm = (event) => {
//     const val = event.target.value;
//     const key = event.target.name;

//     if (num.includes(key)) {
//       setReceiveGiveForm((prevState) => {
//         return { ...prevState, [key]: parseInt(val) };
//       });
//     } else {
//       setReceiveGiveForm((prevState) => {
//         return { ...prevState, [key]: val };
//       });
//     }
//   };

//   const handleBeneficiaries = (event) => {
//     const val = event.target.value;
//     const key = event.target.name;
//     if (num.includes(key)) {
//       setBeneficiaries((prevState) => {
//         return { ...prevState, [key]: parseInt(val) };
//       });
//     } else {
//       setBeneficiaries((prevState) => {
//         return { ...prevState, [key]: val };
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const postTransaction = await axiosInstance.post("/transactions/", value);
//       navigate(-1);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   React.useEffect(() => {
//     setStation(getStation(currentUrl));
//   });

//   const transactionCalculation = () => {
//     var receiveTotal = 0;
//     var giveDollar = 0;
//     var givePound = 0;
//     var giveEuro = 0;
//     var receiving = receiveGive.filter(
//       (receive) => receive.status === "RECEIVING"
//     );
//     var giving = receiveGive.filter((give) => give.status === "GIVING");

//     receiving.forEach((receive) => {
//       var cash = receive.cash * receive.cash_rate;

//       var transfer = receive.transfer * receive.transfer_rate;

//       if (isNaN(cash)) {
//         var purchase = transfer;
//       }
//       if (isNaN(transfer)) {
//         var purchase = cash;
//       }
//       if (!isNaN(cash) && !isNaN(transfer)) {
//         var purchase = cash + transfer;
//       }

//       receiveTotal = receiveTotal + purchase;
//     });

//     giving.forEach((give) => {
//       var cash = give.cash;
//       var transfer = give.transfer;

//       if (isNaN(cash)) {
//         cash = 0;
//       }
//       if (isNaN(transfer)) {
//         transfer = 0;
//       }
//       var sale = cash + transfer;
//       if (give.selling_rate && give.currency === "DOLLAR") {
//         giveDollar = sale;
//         giveNaira = giveNaira - sale * give.selling_rate;
//       }
//       if (give.selling_rate && give.currency === "POUND") {
//         givePound = sale;
//         giveNaira = giveNaira - sale * give.selling_rate;
//       }
//       if (give.selling_rate && give.currency === "EURO") {
//         giveEuro = cash + transfer;
//         giveNaira = giveNaira - sale * give.selling_rate;
//       }
//     });

//     return { giveNaira, giveDollar, givePound, giveEuro };
//   };

//   const handleUpdate = async (event) => {
//     try {
//       const updateTransaction = await axiosInstance.patch(
//         `/transactions/${value.id}`,
//         value
//       );
//       event.preventDefault();
//       navigate(-1);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (event) => {
//     try {
//       const deleteTransaction = await axiosInstance.delete(
//         `/transactions/${value.id}`
//       );
//       event.preventDefault();
//       navigate(-1);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           backgroundColor: "white",
//           borderRadius: 1,
//           padding: 3,
//         }}
//       >
//         <FormStack>
//           {value.receipt_number ? (
//             <TextField
//               disabled
//               id="standard-disabled"
//               label="Receipt Number"
//               defaultValue={value.receipt_number}
//               variant="standard"
//               fullWidth
//             />
//           ) : (
//             <></>
//           )}

//           <TextField
//             id="standard-select-currency"
//             select
//             label="Category"
//             value={value.category}
//             variant="standard"
//             fullWidth
//             name="category"
//             onChange={handleChange}
//             size="small"
//           >
//             <MenuItem value="PURCHASE">PURCHASE</MenuItem>
//             <MenuItem value="SALES">SALES</MenuItem>
//             <MenuItem value="CROSS_CURRENCY">CROSS CURRENCY</MenuItem>
//           </TextField>
//         </FormStack>

//         <FormStack>
//           <Typography variant="h6">Receiving or Giving</Typography>
//           {receiveGive.length === 8 ? (
//             <IconButton
//               disabled
//               color="inherit"
//               sx={{ m: 0, p: 0 }}
//               onClick={() => {
//                 setReceiveGive([...receiveGive, receiveGiveForm]);
//                 setReceiveGiveForm(receiveGiveFormData);
//               }}
//             >
//               <AddCircleOutlineIcon sx={{ mt: 0.7 }} />
//             </IconButton>
//           ) : (
//             <IconButton
//               color="inherit"
//               sx={{ m: 0, p: 0 }}
//               onClick={() => {
//                 setReceiveGive([...receiveGive, receiveGiveForm]);
//                 setReceiveGiveForm(receiveGiveFormData);
//               }}
//             >
//               <AddCircleOutlineIcon sx={{ mt: 0.7 }} />
//             </IconButton>
//           )}

//           <IconButton
//             color="inherit"
//             sx={{ m: 0, p: 0 }}
//             onClick={() => {
//               setReceiveGive(receiveGive.slice(0, -1));
//               setReceiveGiveForm({});
//             }}
//           >
//             <RemoveCircleOutlineIcon sx={{ mt: 0.7 }} />
//           </IconButton>
//         </FormStack>

//         {receiveGive === [] ? (
//           <></>
//         ) : (
//           receiveGive.map((receive) => (
//             <>
//               <FormStack>
//             <TextField
//               id="standard-basic"
//               label="Customer Name"
//               variant="standard"
//               fullWidth
//               name="customer_name2"
//               onChange={handleChange}
//               defaultValue={value.customer_name2}
//               size="small"
//             />
//             <TextField
//               id="standard-basic"
//               label="Account Number"
//               variant="standard"
//               fullWidth
//               name="account_number2"
//               onChange={handleChange}
//               defaultValue={value.account_number2}
//               size="small"
//             />
//             <TextField
//               id="standard-basic"
//               label="Bank Name"
//               fullWidth
//               variant="standard"
//               name="bank_name2"
//               onChange={handleChange}
//               defaultValue={value.bank_name2}
//               size="small"
//             />
//           </FormStack>
//                 ) : (
//                   <></>
//                 )}
//               </FormStack>
//               <hr />
//             </>
//           ))
//         )}
//         <FormStack>
//           <TextField
//             id="standard-select-currency"
//             label="Status"
//             value={receiveGiveForm.status}
//             defaultValue="RECEIVING"
//             variant="standard"
//             fullWidth
//             name="status"
//             onChange={handleReceiveGiveForm}
//             size="small"
//             select
//           >
//             <MenuItem value="RECEIVING">RECEIVING</MenuItem>
//             <MenuItem value="GIVING">GIVING</MenuItem>
//           </TextField>

//           <TextField
//             id="standard-select-currency"
//             select
//             label="Mode"
//             value={receiveGiveForm.mode}
//             variant="standard"
//             fullWidth
//             name="mode"
//             onChange={handleReceiveGiveForm}
//             size="small"
//           >
//             <MenuItem value="CASH">CASH</MenuItem>
//             <MenuItem value="TRANSFER">TRANSFER</MenuItem>
//             <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
//             <MenuItem value="CASH_AND_TRANSFER">CASH AND TRANSFER</MenuItem>
//           </TextField>
//           <TextField
//             id="standard-select-currency"
//             select
//             label="Currency"
//             value={receiveGiveForm.currency}
//             variant="standard"
//             fullWidth
//             name="currency"
//             onChange={handleReceiveGiveForm}
//             size="small"
//           >
//             <MenuItem value="NAIRA">NAIRA</MenuItem>
//             <MenuItem value="DOLLAR">DOLLAR</MenuItem>
//             <MenuItem value="POUND">POUND</MenuItem>
//             <MenuItem value="EURO">EURO</MenuItem>
//           </TextField>
//           {(value.category === "SALES" ||
//             value.category === "CROSS_CURRENCY") &&
//           receiveGiveForm.status === "GIVING" ? (
//             <TextField
//               id="standard-number"
//               label="Selling Rate"
//               type="number"
//               variant="standard"
//               fullWidth
//               size="small"
//               name="selling_rate"
//               onChange={handleReceiveGiveForm}
//               defaultValue={receiveGiveForm.selling_rate}
//             />
//           ) : (
//             <></>
//           )}
//         </FormStack>
//         <FormStack>
//           {receiveGiveForm.mode === "CASH" ? (
//             <>
//               <TextField
//                 id="standard-number"
//                 label="Cash Amount"
//                 type="number"
//                 variant="standard"
//                 fullWidth
//                 name="cash"
//                 value={receiveGiveForm.cash}
//                 onChange={handleReceiveGiveForm}
//                 size="small"
//               />
//               <TextField
//                 id="standard-number"
//                 label="Cash Rate"
//                 type="number"
//                 variant="standard"
//                 fullWidth
//                 size="small"
//                 name="cash_rate"
//                 onChange={handleReceiveGiveForm}
//                 defaultValue={receiveGiveForm.cash_rate}
//               />
//             </>
//           ) : (
//             <></>
//           )}
//           {receiveGiveForm.mode === "TRANSFER" ||
//           receiveGiveForm.mode === "DEPOSIT" ? (
//             <>
//               {receiveGiveForm.status === "RECEIVING" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Transfer Amount"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   name="transfer"
//                   value={receiveGiveForm.transfer}
//                   onChange={handleReceiveGiveForm}
//                   size="small"
//                 />
//         </FormStack>
//         {value.recieve_mode === "TRANSFER" ||
//         value.recieve_mode === "DEPOSIT" ||
//         value.recieve_mode === "CASH_AND_TRANSFER" ? (
//           <FormStack>
//             <TextField
//               id="standard-select-currency"
//               select
//               label="Bank name"
//               value={value.bank_name}
//               variant="standard"
//               fullWidth
//               name="tansfered_to"
//               onChange={handleChange}
//               size="small"
//             >
//               <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
//               <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
//               <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
//               <MenuItem value="FCMB">FCMB</MenuItem>
//             </TextField>
//             <TextField
//               id="standard-select-currency"
//               select
//               label="Account name"
//               value={value.account_name}
//               variant="standard"
//               fullWidth
//               name="tansfered_to"
//               onChange={handleChange}
//               size="small"
//             >
//               <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
//               <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
//               <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
//               <MenuItem value="FCMB">FCMB</MenuItem>
//             </TextField>
//           </FormStack>
//               ) : (
//                 <></>
//               )}
//               {receiveGiveForm.status === "GIVING" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Transfer Amount"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   name="transfer"
//                   value={
//                     (receiveGiveForm.transfer =
//                       transactionCalculation().giveNaira)
//                   }
//                   onChange={handleReceiveGiveForm}
//                   size="small"
//                 />
//               ) : (
//                 <></>
//               )}
//               {receiveGiveForm.status === "GIVING" &&
//               value.category === "SALES" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Transfer Amount"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   name="transfer"
//                   value={
//                     (receiveGiveForm.transfer =
//                       transactionCalculation().giveNaira)
//                   }
//                   onChange={handleReceiveGiveForm}
//                   size="small"
//                 />
//               ) : (
//                 <></>
//               )}

//               {receiveGiveForm.status === "RECEIVING" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Transfer Rate"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   size="small"
//                   name="transfer_rate"
//                   onChange={handleReceiveGiveForm}
//                   defaultValue={receiveGiveForm.transfer_rate}
//                 />
//               ) : (
//                 <></>
//               )}
//             </>
//           ) : (
//             <></>
//           )}
//           {receiveGiveForm.mode === "CASH_AND_TRANSFER" ? (
//             <>
//               <TextField
//                 id="standard-number"
//                 label="Cash Amount"
//                 type="number"
//                 variant="standard"
//                 fullWidth
//                 name="cash"
//                 defaultValue={receiveGiveForm.cash}
//                 onChange={handleReceiveGiveForm}
//                 size="small"
//               />

//               {receiveGiveForm.status === "RECEIVING" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Cash Rate"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   size="small"
//                   name="cash_rate"
//                   onChange={handleReceiveGiveForm}
//                   defaultValue={receiveGiveForm.cash_rate}
//                 />
//               ) : (
//                 <></>
//               )}
//               {value.category === "SALES" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Transfer Amount"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   name="transfer"
//                   value={
//                     (receiveGiveForm.transfer =
//                       transactionCalculation().giveNaira - receiveGiveForm.cash)
//                   }
//                   onChange={handleReceiveGiveForm}
//                   size="small"
//                 />
//               ) : (
//                 <></>
//               )}
//               {receiveGiveForm.status === "RECEIVING" ? (
//                 <TextField
//                   id="standard-number"
//                   label="Transfer Rate"
//                   type="number"
//                   variant="standard"
//                   fullWidth
//                   size="small"
//                   name="transfer_rate"
//                   onChange={handleReceiveGiveForm}
//                   defaultValue={receiveGiveForm.transfer_rate}
//                 />
//               ) : (
//                 <></>
//               )}
//             </>
//           ) : (
//             <></>
//           )}
//         </FormStack>
//         {receiveGiveForm.mode === "TRANSFER" ||
//         receiveGiveForm.mode === "DEPOSIT" ||
//         receiveGiveForm.mode === "CASH_AND_TRANSFER" ? (
//           <FormStack>
//             <TextField
//               id="standard-select-currency"
//               select
//               label="Bank name"
//               value={receiveGiveForm.bank_name}
//               variant="standard"
//               fullWidth
//               name="bank_name"
//               onChange={handleReceiveGiveForm}
//               size="small"
//             >
//               <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
//               <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
//               <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
//               <MenuItem value="FCMB">FCMB</MenuItem>
//             </TextField>
//             <TextField
//               id="standard-select-currency"
//               select
//               label="Account name"
//               value={receiveGiveForm.account_name}
//               variant="standard"
//               fullWidth
//               name="account_name"
//               onChange={handleReceiveGiveForm}
//               size="small"
//             >
//               <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
//               <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
//               <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
//               <MenuItem value="FCMB">FCMB</MenuItem>
//             </TextField>
//           </FormStack>
//         ) : (
//           <></>
//         )}
//  <FormStack>
//           <TextField
//             id="standard-basic"
//             label="Description"
//             variant="standard"
//             fullWidth
//             name="description"
//             onChange={handleChange}
//             value={value.description}
//             size="small"
//           />
//           <TextField
//             disabled
//             id="standard-disabled"
//             label="Initiator"
//             variant="standard"
//             fullWidth
//             name="initiator"
//             onChange={handleChange}
//             size="small"
//             value={(value.initiator = station)}
//             defaultValue={station}
//           />
//           <TextField
//             id="standard-select-currency"
//             select
//             label="Status"
//             value={(value.status = "SENT")}
//             variant="standard"
//             fullWidth
//             name="status"
//             onChange={handleChange}
//             size="small"
//           >
//             <MenuItem value="SENT">SENT</MenuItem>
//             <MenuItem value="INITIATED">INITIATED</MenuItem>
//             <MenuItem value="COMPLETED">COMPLETED</MenuItem>
//           </TextField>
//         </FormStack>
//         <FormStack></FormStack>
//           <FormStack>
//         <Typography variant="h6">Totals:</Typography>
//         <FormStack>
//           <Typography>&#8358;: {transactionCalculation().giveNaira}</Typography>
//           <Typography>&#36; {transactionCalculation().giveDollar}</Typography>
//           <Typography>&#163;: {transactionCalculation().givePound}</Typography>
//           <Typography>&#128;: {transactionCalculation().giveEuro}</Typography>
//         </FormStack>

        // <FormStack>
        //   {use === "create" ? (
        //     <>
        //       <Button variant="text" type="submit" sx={purpleButton}>
        //         SENT
        //       </Button>
        //       <CancelButton name="Cancel" />
        //     </>
        //   ) : (
        //     <>
        //       {" "}
        //       <Button variant="text" sx={purpleButton} onClick={handleUpdate}>
        //         EDIT
        //       </Button>
        //       <Button
        //         variant="text"
        //         sx={purpleButton}
        //         onClick={() => {
        //           navigate(`/${value.receipt_number}`);
        //         }}
        //       >
        //         Generate Receipt
        //       </Button>
        //       <Button variant="text" sx={deleteButton} onClick={handleDelete}>
        //         DELETE
        //       </Button>
        //       <CancelButton name="Cancel" />
        //     </>
        //   )}
        // </FormStack>
//       </Box>
//     </>
//   );
// }
