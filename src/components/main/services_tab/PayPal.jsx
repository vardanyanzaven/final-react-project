import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

export const PayPal = ({ setdisabled, value }) => {
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "Afx4MFjXwvT3u4jra9bDoFMPK4h0MAlhk-f_LrIXiHw2IlC0nxnYp_msUFPbuYpFt9JpHsmiG3OQ8Psc",
        }}
      >
        <PayPalButtons
          key={Math.random()}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      value: value.toString(),
                    },
                  },
                ],
              })
              .then((orderId) => {
                setdisabled(false);
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {});
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};
