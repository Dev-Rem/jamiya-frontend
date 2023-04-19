import React from "react";
import jsPDF from "jspdf";
import Box from "@mui/material/Box";

const doc = new jsPDF();

export const GenerateTransactionReceipt = (props) => {
  const [transactionData, setTransactionData] = React.useState(props.data);

  const myRef = React.useRef(null);

  function generatePDF() {
    // Use the ref of your component to get its HTML content
    const input = document.getElementById("my-component");
    // Get the HTML content of your component
    const html = input.innerHTML;
    // Use jsPDF to create the PDF
    doc.html(html, {
      callback: function (pdf) {
        // Save the PDF to a file
        pdf.save("my-pdf.pdf");
      },
    });
  }
  React.useEffect(() => {
    generatePDF();
  });
  return (
    <div ref={myRef} id="my-component">
      <Box
        component="form"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          padding: 3,
        }}
      >
        <p>this is the pdf page</p>
      </Box>
    </div>
  );
};
