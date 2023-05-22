import React from "react";
import { GenerateTransactionReceipt } from "../components/utils/CreateReceiptPdf";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";

export const PreviewReceipt = () => {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Transaction Receipt" />
        <GenerateTransactionReceipt />
      </ResponsiveDrawer>
    </div>
  );
};
