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
import Grid from "@mui/material/Grid";
import html2pdf from "html2pdf.js";

export const GenerateTransactionReceipt = () => {
  const navigate = useNavigate();
  const currentUrl = useLocation();
  console.log(currentUrl);
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

  const downloadPDF = () => {
    const element = document.getElementById("receipt-container"); // Replace 'your-div-id' with the actual ID of your <div> element

    html2pdf().from(element).save(`${transaction.receipt_number}.pdf`);
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
        <Button variant="text" sx={purpleButton} onClick={downloadPDF}>
          Download
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
        <div
          ref={printContentRef}
          className="receipt-container"
          id="receipt-container"
        >
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
            <Grid
              container
              spacing={{ xs: 2, md: 5 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {transaction.beneficiaries.map((entry) => (
                <Grid item xs={2} sm={6} md={6}>
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
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6">Transaction Details</Typography>
            <hr />

            <>
              {transaction.category === "PURCHASE" ? (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}>Customer Brought</TableCell>
                        <TableCell sx={{ py: 1 }} align="center">
                          Rate
                        </TableCell>

                        <TableCell sx={{ py: 1 }} align="right">
                          Customer Gets
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}>Cash / Transfer</TableCell>
                        <TableCell sx={{ py: 1 }} align="center">
                          Cash / Transfer
                        </TableCell>
                        <TableCell sx={{ py: 1 }} align="right">
                          Amount
                        </TableCell>
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
                            <TableCell sx={{ py: 1 }}>
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="right">
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
                          <TableCell sx={{ py: 1 }} rowSpan={3} />
                          <TableCell sx={{ py: 1 }}>Cash Collected</TableCell>
                          <TableCell sx={{ py: 1 }} colSpan={2} align="right">
                            {giving.map((entry) => (
                              <>
                                {entry.cash === 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    {getCurrencySymbol(entry.currency)}
                                    <NumericFormat
                                      value={entry.cash}
                                      thousandSeparator={true}
                                      displayType="text"
                                      renderText={(formattedValue) => (
                                        <span>{formattedValue}</span>
                                      )}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ py: 1 }} colSpan={1}>
                            Amount Transfered
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
                            {giving.map((entry) => (
                              <>
                                {entry.transfer === 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    {getCurrencySymbol(entry.currency)}
                                    <NumericFormat
                                      value={entry.transfer}
                                      thousandSeparator={true}
                                      displayType="text"
                                      renderText={(formattedValue) => (
                                        <span>{formattedValue}</span>
                                      )}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ py: 1 }} colSpan={1}>
                            Total
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
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
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : transaction.category === "SALES" ? (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}>Customer Brought</TableCell>
                        <TableCell sx={{ py: 1 }} align="center">
                          Rate
                        </TableCell>

                        <TableCell sx={{ py: 1 }} align="right">
                          Customer Gets
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}>Cash / Transfer</TableCell>
                        <TableCell sx={{ py: 1 }} align="center">
                          Cash / Transfer
                        </TableCell>
                        <TableCell sx={{ py: 1 }} align="right">
                          Amount
                        </TableCell>
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
                            <TableCell sx={{ py: 1 }}>
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
                            <TableCell sx={{ py: 1 }} align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>

                            <TableCell sx={{ py: 1 }} align="right">
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell sx={{ py: 1 }} rowSpan={3} />
                          <TableCell sx={{ py: 1 }}>Cash Collected</TableCell>
                          <TableCell sx={{ py: 1 }} colSpan={2} align="right">
                            {giving.map((entry) => (
                              <>
                                {entry.cash === 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    {getCurrencySymbol(entry.currency)}
                                    <NumericFormat
                                      value={entry.cash}
                                      thousandSeparator={true}
                                      displayType="text"
                                      renderText={(formattedValue) => (
                                        <span>{formattedValue}</span>
                                      )}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ py: 1 }} colSpan={1}>
                            Amount Transfered
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
                            {giving.map((entry) => (
                              <>
                                {entry.transfer === 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    {getCurrencySymbol(entry.currency)}
                                    <NumericFormat
                                      value={entry.transfer}
                                      thousandSeparator={true}
                                      displayType="text"
                                      renderText={(formattedValue) => (
                                        <span>{formattedValue}</span>
                                      )}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ py: 1 }}>Total</TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
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
                          <TableCell sx={{ py: 1 }} colSpan={1}></TableCell>
                          <TableCell sx={{ py: 1 }} align="right"></TableCell>
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
                        <TableCell sx={{ py: 1 }}>Customer Brought</TableCell>
                        <TableCell sx={{ py: 1 }} align="center">
                          Rate
                        </TableCell>

                        <TableCell sx={{ py: 1 }} align="right">
                          Customer Gets
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}>Cash / Transfer</TableCell>
                        <TableCell sx={{ py: 1 }} align="center">
                          Cah / Transfer
                        </TableCell>
                        <TableCell sx={{ py: 1 }} align="right">
                          Amount
                        </TableCell>
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
                            <TableCell sx={{ py: 1 }} align="left">
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="right"></TableCell>
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
                            <TableCell sx={{ py: 1 }} align="left"></TableCell>

                            <TableCell sx={{ py: 1 }} align="center">
                              {entry.cash_rate ? entry.cash_rate : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer_rate ? entry.transfer_rate : ""}
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="right">
                              {getCurrencySymbol(entry.currency)}
                              {entry.cash ? entry.cash : ""}
                              {entry.cash && entry.transfer ? " / " : ""}
                              {entry.transfer ? entry.transfer : ""}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell sx={{ py: 1 }} rowSpan={3} />
                          <TableCell sx={{ py: 1 }} colSpan={1}>
                            Cash Collected
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
                            {giving.map((entry) => (
                              <>
                                {entry.cash === 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    {getCurrencySymbol(entry.currency)}
                                    <NumericFormat
                                      value={entry.cash}
                                      thousandSeparator={true}
                                      displayType="text"
                                      renderText={(formattedValue) => (
                                        <span>{formattedValue}</span>
                                      )}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ py: 1 }}>
                            Amount Transfered
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
                            {giving.map((entry) => (
                              <>
                                {entry.transfer === 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    {getCurrencySymbol(entry.currency)}
                                    <NumericFormat
                                      value={entry.transfer}
                                      thousandSeparator={true}
                                      displayType="text"
                                      renderText={(formattedValue) => (
                                        <span>{formattedValue}</span>
                                      )}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ py: 1 }} colSpan={1}>
                            Total
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
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
                          <TableCell sx={{ py: 1 }} colSpan={1}></TableCell>
                          <TableCell sx={{ py: 1 }} align="right"></TableCell>
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
