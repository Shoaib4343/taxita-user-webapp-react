// src/components/PaymentForm.jsx
import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const PaymentForm = ({ onClose }) => {
  const [card, setCard] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});

  // Input handlers
  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCard({ ...card, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // digits only
    if (value.length > 4) value = value.slice(0, 4);

    let month = value.slice(0, 2);
    let year = value.slice(2, 4);

    // Ensure month is 01-12
    if (month.length === 2) {
      const monthNum = Number(month);
      if (monthNum < 1) month = "01";
      else if (monthNum > 12) month = "12";
    }

    let formatted = month;
    if (year) formatted += "/" + year;

    setCard({ ...card, expiry: formatted });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!card.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(card.email))
      newErrors.email = "Invalid email address";

    const cleanCardNumber = card.cardNumber.replace(/\s/g, "");
    if (!card.cardNumber) newErrors.cardNumber = "Card number is required";
    else if (cleanCardNumber.length !== 16)
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!card.expiry) newErrors.expiry = "Expiry is required";
    else {
      const [m, y] = card.expiry.split("/");
      if (!m || !y) newErrors.expiry = "Expiry must be MM/YY";
      else if (Number(m) < 1 || Number(m) > 12)
        newErrors.expiry = "Month must be between 01 and 12";
    }

    if (!card.cvc) newErrors.cvc = "CVC is required";
    else if (card.cvc.length < 3 || card.cvc.length > 4)
      newErrors.cvc = "CVC must be 3 or 4 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Payment Data:", card);
    toast.success("Payment successful! 🎉");

    // Reset form
    setCard({ email: "", cardNumber: "", expiry: "", cvc: "" });
    onClose();
  };

  return (
    <div className="px-6 pb-4  flex flex-col justify-between">
      {/* Header */}
      <div className="text-center mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-900">
          Trading Year 2025-2026
        </h2>
        <p className="text-gray-600 mt-1">You are going to purchase this plan</p>
        <p className="text-3xl font-extrabold text-blue-600 mt-3">£2.00</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-between space-y-3"
      >
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={card.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={card.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 1234 1234 1234"
            maxLength={19}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiry & CVC */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              name="expiry"
              value={card.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">CVC</label>
            <input
              type="text"
              name="cvc"
              value={card.cvc}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            {errors.cvc && (
              <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition transform cursor-pointer mt-2 flex-shrink-0"
        >
          <CreditCard className="w-5 h-5" />
          Confirm & Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
