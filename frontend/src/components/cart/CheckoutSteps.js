import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <>
      <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? (
          <Link to="shipping" className="float-right">
            <div className="triangle2-active" />
            <div className="step active-step">Shipping</div>
            <div className="triangle-active" />
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete" />
            <div className="step incomplete">Shipping</div>
            <div className="triangle-incomplete" />
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/confirm" className="float-right">
            <div className="triangle2-active" />
            <div className="step active-step">Confirm Order</div>
            <div className="triangle-active" />
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete" />
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete" />
          </Link>
        )}

        {payment ? (
          <Link to="/payment" className="float-right">
            <div className="triangle2-active" />
            <div className="step active-step">Payment</div>
            <div className="triangle-active" />
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete" />
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete" />
          </Link>
        )}
      </div>
    </>
  );
};

export default CheckoutSteps;
