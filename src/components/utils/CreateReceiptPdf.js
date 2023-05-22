import React from "react";
import Box from "@mui/material/Box";
import "../../assets/css/receipt.css";
import { purpleButton } from "./Button";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import FormStack from "./FormStack";
import FxLogo from "../../assets/images/jamiyafx.png";
import Typography from "@mui/material/Typography";
import MdPhone from "@mui/icons-material/Phone";
import Chip from "@mui/material/Chip";
import { loadCSS } from "fg-loadcss";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NumericFormat } from "react-number-format";

export const GenerateTransactionReceipt = () => {
  const navigate = useNavigate();
  const currentUrl = useLocation();
  const [transaction, setTransaction] = React.useState(currentUrl.state.data);
  const [receiving, setReceiving] = React.useState(
    currentUrl.state.data.receive_give.filter(
      (receive) => receive.status === "RECEIVING"
    )
  );
  const [giving, setGiving] = React.useState(
    currentUrl.state.data.receive_give.filter(
      (give) => give.status === "GIVING"
    )
  );
  const printContentRef = React.useRef(null);
  console.log(giving);

  const handlePrint = () => {
    const printContent = printContentRef.current.innerHTML;
    const duplicatedContent = printContent + printContent;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = duplicatedContent;
    // Add print styles for consistent margins
    const printStyles = `
    <style>
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    </style>
  `;

    // Append print styles to the print content
    const printHTML = `${printStyles}${document.body.innerHTML}`;

    document.body.innerHTML = printHTML;

    window.print();
    document.body.innerHTML = originalContents;
  };

  function getCurrencySymbol(currencyName) {
    const currencySymbols = {
      DOLLAR: "\u0024", // $
      EURO: "\u20AC", // €
      POUND: "\u00A3", // £
      NAIRA: "\u20A6", // ₦
      // Add more currency symbols as needed
    };

    return currencySymbols[currencyName] || "";
  }

  const date = new Date(transaction.last_updated);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
      // Inject before JSS
      document.querySelector("#font-awesome-css") || document.head.firstChild
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <>
      <FormStack>
        <Button variant="text" sx={purpleButton} onClick={handlePrint}>
          print
        </Button>
        <Button variant="text" sx={purpleButton} onClick={() => navigate("/")}>
          dashboard
        </Button>
      </FormStack>
      <FormStack></FormStack>
      <Box
        component="form"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          padding: 3,
        }}
      >
        <div ref={printContentRef} className="receipt-container">
          <div className="receipt">
            <div className="container">
              <div className="row">
                <div className="item">
                  <img
                    src={FxLogo}
                    alt="JamiyaFX Logo"
                    className="logo-image"
                  />
                </div>
              </div>
              <div className="row">
                <div className="item">
                  <Typography variant="h4">
                    Transaction Receipt: {transaction.receipt_number}
                  </Typography>
                </div>
              </div>
              <div className="row">
                <div className="item">
                  <Typography variant="subtitle2">
                    Head Office:{" "}
                    <Typography
                      variant="body2"
                      component="span"
                      style={{ display: "inline" }}
                    >
                      871 Tafawa Balewa Way, Opposite NICON Luxury Area 11 Garki
                      , Abuja.
                    </Typography>
                  </Typography>
                </div>
              </div>
              <div className="row">
                <div className="item">
                  <Typography variant="subtitle2">
                    Branch Office:{" "}
                    <Typography
                      variant="body2"
                      component="span"
                      style={{ display: "inline" }}
                    >
                      No 8 Faskari Street (Savannah Suites), Area 3 Garki,
                      Abuja.
                    </Typography>
                  </Typography>
                </div>
              </div>
              <div className="row">
                <div className="item">
                  <Typography>
                    {" "}
                    <Chip
                      icon={<MdPhone />}
                      label="08091666658, 08025260000"
                      sx={{ padding: 0, my: 0 }}
                    />
                    <Chip icon={<EmailIcon />} label="info@aremkogroup.com" />
                    <Chip icon={<LanguageIcon />} label="www.aremkogroup.com" />
                  </Typography>
                </div>
              </div>
              <div className="row">
                <div className="item">
                  <Typography variant="body2" sx={{ my: 0 }}>
                    Transaction Date:{" "}
                    <Typography
                      variant="caption"
                      component="span"
                      style={{ display: "inline" }}
                    >
                      {formattedDate}
                    </Typography>
                  </Typography>
                </div>
              </div>
            </div>
            <Typography variant="h6">Customer Details</Typography>
            <hr />
            <Typography variant="body1">
              Contact:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {transaction.phone_number}
              </Typography>
            </Typography>
            {transaction.beneficiaries.map((entry) => (
              <>
                <FormStack>
                  <Typography variant="body1">
                    Name:{" "}
                    <Typography
                      variant="subtitle2"
                      fullWidth
                      component="span"
                      style={{ display: "inline" }}
                    >
                      {entry.customer_account_name}
                    </Typography>
                  </Typography>
                  {entry.customer_account_number ? (
                    <Typography variant="body1">
                      Account Number:{" "}
                      <Typography
                        variant="subtitle2"
                        fullWidth
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {`${entry.customer_account_number
                          .toString()
                          .slice(0, 2)}${"*".repeat(
                          entry.customer_account_number.toString().length - 4
                        )}${entry.customer_account_number
                          .toString()
                          .slice(-2)}`}
                      </Typography>
                    </Typography>
                  ) : (
                    <></>
                  )}

                  {entry.customer_bank_name ? (
                    <Typography variant="body1">
                      Bank:{" "}
                      <Typography
                        variant="subtitle2"
                        fullWidth
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.customer_bank_name}
                      </Typography>
                    </Typography>
                  ) : (
                    <></>
                  )}

                  {entry.amount ? (
                    <Typography variant="body1">
                      Amount:{" "}
                      <Typography
                        variant="subtitle2"
                        fullWidth
                        component="span"
                        style={{ display: "inline" }}
                      >
                        <NumericFormat
                          value={entry.amount}
                          thousandSeparator={true}
                          displayType="text"
                          renderText={(formattedValue) => (
                            <span>{formattedValue}</span>
                          )}
                        />
                      </Typography>
                    </Typography>
                  ) : (
                    <></>
                  )}
                </FormStack>
              </>
            ))}
            <Typography variant="h6">Transaction Details</Typography>
            <hr />

            <>
              {transaction.category === "PURCHASE" ? (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Brought</TableCell>
                        <TableCell align="center">Rate</TableCell>

                        <TableCell align="right">Customer Gets</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cash - Transfer</TableCell>
                        <TableCell align="center">Cash - Transfer</TableCell>
                        <TableCell align="right">Cash - Transfer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {receiving.map((entry) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                            <TableCell align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>
                            <TableCell align="right">
                              <NumericFormat
                                value={
                                  entry.transfer * entry.transfer_rate +
                                  entry.cash * entry.cash_rate
                                }
                                thousandSeparator={true}
                                displayType="text"
                                renderText={(formattedValue) => (
                                  <span>
                                    {getCurrencySymbol("NAIRA")}
                                    {formattedValue}
                                  </span>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={1}>Total</TableCell>
                          <TableCell align="right">
                            {giving.map((entry) => (
                              <>
                                {getCurrencySymbol(entry.currency)}
                                <NumericFormat
                                  value={entry.cash + entry.transfer}
                                  thousandSeparator={true}
                                  displayType="text"
                                  renderText={(formattedValue) => (
                                    <span>{formattedValue}</span>
                                  )}
                                />
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : transaction.category === "SALES" ? (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Brought</TableCell>
                        <TableCell align="center">Rate</TableCell>

                        <TableCell align="right">Customer Gets</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cash - Transfer</TableCell>
                        <TableCell align="center">Cash - Transfer</TableCell>
                        <TableCell align="right">Cash - Transfer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {giving.map((entry) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>
                              <NumericFormat
                                value={
                                  entry.transfer * entry.transfer_rate +
                                  entry.cash * entry.cash_rate
                                }
                                thousandSeparator={true}
                                displayType="text"
                                renderText={(formattedValue) => (
                                  <span>
                                    {getCurrencySymbol("NAIRA")}
                                    {formattedValue}
                                  </span>
                                )}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>

                            <TableCell align="right">
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={1}>Total</TableCell>
                          <TableCell align="right">
                            {giving.map((entry) => (
                              <>
                                <NumericFormat
                                  value={entry.cash + entry.transfer}
                                  thousandSeparator={true}
                                  displayType="text"
                                  renderText={(formattedValue) => (
                                    <Typography
                                      variant="body2"
                                      style={{
                                        display: "inline",
                                        marginLeft: 50,
                                      }}
                                    >
                                      {getCurrencySymbol(entry.currency)}
                                      {formattedValue}
                                    </Typography>
                                  )}
                                />
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Brought</TableCell>
                        <TableCell align="center">Rate</TableCell>

                        <TableCell align="right">Customer Gets</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cash - Transfer</TableCell>
                        <TableCell align="center">Cah - Transfer</TableCell>
                        <TableCell align="right">Cash - Transfer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {receiving.map((entry) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left">
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                            <TableCell align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        ))}

                        {giving.map((entry) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left"></TableCell>

                            <TableCell align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>
                            <TableCell align="right">
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " - " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={1}>Total</TableCell>
                          <TableCell align="right">
                            {giving.map((entry) => (
                              <>
                                <NumericFormat
                                  value={entry.cash + entry.transfer}
                                  thousandSeparator={true}
                                  displayType="text"
                                  renderText={(formattedValue) => (
                                    <Typography
                                      variant="body2"
                                      style={{
                                        display: "inline",
                                        marginLeft: 50,
                                      }}
                                    >
                                      {getCurrencySymbol(entry.currency)}
                                      {formattedValue}
                                    </Typography>
                                  )}
                                />
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
            <div className="bottom-div">
              <FormStack>
                <div className="signature-container">
                  <label className="signature-label">Customer Signature</label>
                  <div className="signature-box" id="customer-sign"></div>
                </div>
                <div className="signature-container">
                  <label className="signature-label">Cashier Signature</label>
                  <div className="signature-box" id="cashier-sign"></div>
                </div>
              </FormStack>
              <br />
              <div className="container">
                <Typography variant="button" display="block">
                  For any inquiries or assistance, please contact us.
                </Typography>
                <Typography variant="button" display="block">
                  Thank you for being a valued customer and for your ongoing
                  trust!!!
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
