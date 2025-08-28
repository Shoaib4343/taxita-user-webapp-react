// // src/components/PaymentForm.jsx
// import React, { useState } from "react";
// import { CreditCard } from "lucide-react";
// import toast from "react-hot-toast";

// const PaymentForm = ({ onClose }) => {
//   const [card, setCard] = useState({
//     email: "",
//     cardNumber: "",
//     expiry: "",
//     cvc: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Input handlers
//   const handleChange = (e) => {
//     setCard({ ...card, [e.target.name]: e.target.value });
//   };

//   const handleCardNumberChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // remove non-digits
//     if (value.length > 16) value = value.slice(0, 16);
//     const formatted = value.replace(/(.{4})/g, "$1 ").trim();
//     setCard({ ...card, cardNumber: formatted });
//   };

//   const handleExpiryChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // digits only
//     if (value.length > 4) value = value.slice(0, 4);

//     let month = value.slice(0, 2);
//     let year = value.slice(2, 4);

//     // Ensure month is 01-12
//     if (month.length === 2) {
//       const monthNum = Number(month);
//       if (monthNum < 1) month = "01";
//       else if (monthNum > 12) month = "12";
//     }

//     let formatted = month;
//     if (year) formatted += "/" + year;

//     setCard({ ...card, expiry: formatted });
//   };

//   // Validation
//   const validate = () => {
//     const newErrors = {};

//     if (!card.email) newErrors.email = "Email is required";
//     else if (!/^\S+@\S+\.\S+$/.test(card.email))
//       newErrors.email = "Invalid email address";

//     const cleanCardNumber = card.cardNumber.replace(/\s/g, "");
//     if (!card.cardNumber) newErrors.cardNumber = "Card number is required";
//     else if (cleanCardNumber.length !== 16)
//       newErrors.cardNumber = "Card number must be 16 digits";

//     if (!card.expiry) newErrors.expiry = "Expiry is required";
//     else {
//       const [m, y] = card.expiry.split("/");
//       if (!m || !y) newErrors.expiry = "Expiry must be MM/YY";
//       else if (Number(m) < 1 || Number(m) > 12)
//         newErrors.expiry = "Month must be between 01 and 12";
//     }

//     if (!card.cvc) newErrors.cvc = "CVC is required";
//     else if (card.cvc.length < 3 || card.cvc.length > 4)
//       newErrors.cvc = "CVC must be 3 or 4 digits";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     console.log("Payment Data:", card);
//     toast.success("Payment successful! 🎉");

//     // Reset form
//     setCard({ email: "", cardNumber: "", expiry: "", cvc: "" });
//     onClose();
//   };

//   return (
//     <div className="px-6 pb-4  flex flex-col justify-between">
//       {/* Header */}
//       <div className="text-center mb-4 flex-shrink-0">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Trading Year 2025-2026
//         </h2>
//         <p className="text-gray-600 mt-1">You are going to purchase this plan</p>
//         <p className="text-3xl font-extrabold text-blue-600 mt-3">£2.00</p>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="flex-1 flex flex-col justify-between space-y-3"
//       >
//         {/* Email */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={card.email}
//             onChange={handleChange}
//             placeholder="you@example.com"
//             className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Card Number */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Card Number
//           </label>
//           <input
//             type="text"
//             name="cardNumber"
//             value={card.cardNumber}
//             onChange={handleCardNumberChange}
//             placeholder="1234 1234 1234 1234"
//             maxLength={19}
//             className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//           />
//           {errors.cardNumber && (
//             <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
//           )}
//         </div>

//         {/* Expiry & CVC */}
//         <div className="flex gap-3">
//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-1">
//               Expiry (MM/YY)
//             </label>
//             <input
//               type="text"
//               name="expiry"
//               value={card.expiry}
//               onChange={handleExpiryChange}
//               placeholder="MM/YY"
//               maxLength={5}
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             />
//             {errors.expiry && (
//               <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
//             )}
//           </div>

//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-1">CVC</label>
//             <input
//               type="text"
//               name="cvc"
//               value={card.cvc}
//               onChange={handleChange}
//               placeholder="123"
//               maxLength={4}
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             />
//             {errors.cvc && (
//               <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition transform cursor-pointer mt-2 flex-shrink-0"
//         >
//           <CreditCard className="w-5 h-5" />
//           Confirm & Pay
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";

// const PaymentForm = ({ onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // 1️⃣ Get clientSecret from backend
//       const res = await fetch("https://taxitaapi.learnify.pk/public/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 200, currency: "usd" }) // adjust dynamically if needed
//       });
//       const { clientSecret, id } = await res.json();

//       if (!clientSecret) throw new Error("Failed to get clientSecret");

//       // 2️⃣ Confirm payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan"
//         }
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       if (paymentIntent?.status === "succeeded") {
//         // 3️⃣ Notify backend about confirmed payment
//         const confirmRes = await fetch("https://taxitaapi.learnify.pk/public/api/confirm-payment", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             transaction_id: id,
//             payment_status: "succeeded"
//           })
//         });
//         const confirmData = await confirmRes.json();

//         if (confirmData.success) {
//           toast.success("Payment successful 🎉");

//           // 4️⃣ Pass payment info to parent (optional)
//           if (onPaymentSuccess) onPaymentSuccess(confirmData);

//           onClose();
//         } else {
//           toast.error("Payment confirmed on Stripe, but backend failed.");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-6 pb-4">
//       <div className="text-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-900">Trading Year 2025-2026</h2>
//         <p className="text-gray-600 mt-1">You are going to purchase this plan</p>
//         <p className="text-3xl font-extrabold text-blue-600 mt-3">£2.00</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <PaymentElement />
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
//         >
//           {loading ? "Processing..." : "Confirm & Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance"; // ✅ import axios instance

// const PaymentForm = ({ clientSecret, onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // 1️⃣ Confirm payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//       });

//       if (error) {
//         toast.error(error.message);
//         setLoading(false);
//         return;
//       }

//       // 2️⃣ Notify backend about confirmed payment
//       if (paymentIntent?.status === "succeeded") {
//         const confirmRes = await axiosInstance.post("/confirm-payment", {
//           transaction_id: paymentIntent.id,
//           payment_status: "succeeded",
//         });

//         const confirmData = confirmRes.data;

//         if (confirmData.success) {
//           toast.success("Payment successful 🎉");
//           if (onPaymentSuccess) onPaymentSuccess(confirmData);
//           onClose();
//         } else {
//           toast.error("Payment confirmed on Stripe, but backend failed.");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//       >
//         {loading ? "Processing..." : "Confirm & Pay"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";

// const PaymentForm = ({ clientSecret, onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // Submit the PaymentElement
//       await elements.submit();

//       // Confirm payment
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//         redirect: "if_required",
//       });

//       if (error) {
//         toast.error(error.message);
//         setLoading(false);
//         return;
//       }

//       console.log("PaymentIntent from Stripe:", paymentIntent);

//       if (paymentIntent?.status === "succeeded") {
//         // ✅ Send payment info to backend
//         try {
//           const confirmRes = await axiosInstance.post("/confirm-payment", {
//             transaction_id: paymentIntent.id,
//             payment_status: paymentIntent.status,
//           });

//           console.log("Backend response:", confirmRes.data);

//           if (confirmRes.data.success) {
//             toast.success("Payment successful 🎉");
//             if (onPaymentSuccess) onPaymentSuccess(confirmRes.data);
//             onClose();
//           } else {
//             toast.error("Payment succeeded, but backend failed.");
//           }
//         } catch (backendErr) {
//           console.error("Backend error:", backendErr.response?.data || backendErr);
//           toast.error(
//             backendErr.response?.data?.message ||
//               "Backend failed to confirm payment"
//           );
//         }
//       } else {
//         toast.error("Payment not completed.");
//       }
//     } catch (err) {
//       console.error("Stripe error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//       >
//         {loading ? "Processing..." : "Confirm & Pay"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";

// const PaymentForm = ({ clientSecret, onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // Confirm payment only once
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//         redirect: "if_required",
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       if (paymentIntent?.status === "succeeded") {
//         // Send payment info to backend (only to save)
//         try {
//           const res = await axiosInstance.post("/confirm-payment", {
//             transaction_id: paymentIntent.id,
//             payment_status: paymentIntent.status,
//             amount: paymentIntent.amount,
//             currency: paymentIntent.currency,
//           });

//           if (res.data.success) {
//             toast.success("Payment successful 🎉");
//             if (onPaymentSuccess) onPaymentSuccess(res.data);
//             onClose();
//           } else {
//             toast.error("Payment succeeded, but backend failed.");
//           }
//         } catch (backendErr) {
//           console.error("Backend error:", backendErr.response?.data || backendErr);
//           toast.error(
//             backendErr.response?.data?.message || "Backend failed to confirm payment"
//           );
//         }
//       } else {
//         toast.error("Payment not completed.");
//       }
//     } catch (err) {
//       console.error("Stripe error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//       >
//         {loading ? "Processing..." : "Confirm & Pay"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";

// const PaymentForm = ({ clientSecret, onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // 1️⃣ Immediately submit Elements
//       await elements.submit();

//       // 2️⃣ Confirm payment
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//         redirect: "if_required",
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       // 3️⃣ Call backend only AFTER payment succeeds
//       if (paymentIntent?.status === "succeeded") {
//         const res = await axiosInstance.post("/confirm-payment", {
//           transaction_id: paymentIntent.id,
//           payment_status: paymentIntent.status,
//           amount: paymentIntent.amount,
//           currency: paymentIntent.currency,
//         });

//         if (res.data.success) {
//           toast.success("Payment successful 🎉");
//           if (onPaymentSuccess) onPaymentSuccess(res.data);
//           onClose();
//         } else {
//           toast.error("Payment succeeded, but backend failed.");
//         }
//       } else {
//         toast.error("Payment not completed.");
//       }
//     } catch (err) {
//       console.error("Stripe error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//       >
//         {loading ? "Processing..." : "Confirm & Pay"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";

// const PaymentCardForm = ({ clientSecret, onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       // 1️⃣ Immediately submit Elements
//       await elements.submit();

//       // 2️⃣ Confirm payment on client
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//         redirect: "if_required",
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       // 3️⃣ Call backend only AFTER payment succeeds
//       if (paymentIntent?.status === "succeeded") {
//         const res = await axiosInstance.post("/confirm-payment", {
//           payment_intent_id: paymentIntent.id,
//           payment_method_id: paymentIntent.payment_method, // this is automatically attached by Stripe
//         });

//         if (res.data.success) {
//           toast.success("Payment successful 🎉");
//           if (onPaymentSuccess) onPaymentSuccess(res.data);
//           onClose();
//         } else {
//           toast.error("Payment succeeded, but backend failed.");
//         }
//       } else {
//         toast.error("Payment not completed.");
//       }
//     } catch (err) {
//       console.error("Stripe error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//       >
//         {loading ? "Processing..." : "Confirm & Pay"}
//       </button>
//     </form>
//   );
// };

// export default PaymentCardForm;

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";

// const PaymentCardForm = ({ clientSecret, onClose, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       console.log("Stripe or Elements not loaded yet");
//       return;
//     }

//     setLoading(true);
//     console.log("Submitting payment...");

//     try {
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//         redirect: "if_required",
//       });

//       console.log("Stripe confirmPayment result:", { error, paymentIntent });

//       if (error) {
//         toast.error(error.message || "Stripe error occurred");
//         return;
//       }

//       if (paymentIntent?.status === "succeeded") {
//         console.log("Payment succeeded! Sending to backend...");
//         const res = await axiosInstance.post("/confirm-payment", {
//           payment_intent_id: paymentIntent.id,
//           payment_method_id: paymentIntent.payment_method,
//         });

//         console.log("Backend response:", res.data);

//         if (res.data.success) {
//           toast.success("Payment successful 🎉");
//           if (onPaymentSuccess) onPaymentSuccess(res.data);
//           onClose();
//         } else {
//           toast.error("Payment succeeded, but backend failed.");
//         }
//       } else {
//         console.log("Payment status not succeeded:", paymentIntent?.status);
//         toast.error("Payment not completed.");
//       }
//     } catch (err) {
//       console.error("Stripe/JS error:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//       >
//         {loading ? "Processing..." : "Confirm & Pay"}
//       </button>
//     </form>
//   );
// };

// export default PaymentCardForm;

// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import axiosInstance from "../services/axiosInstance";

// export default function PaymentCardForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting payment...");

//     // Step 1: Call elements.submit() synchronously
//     const submitResult = await elements.submit();
//     console.log("Elements submitted:", submitResult);

//     if (!stripe || !elements) return;

//     try {
//       // Step 2: Create payment intent on your backend (can be async)
//       const response = await axiosInstance.post("/create-payment-intent", {
//         amount: 6500, // example
//         currency: "usd"
//       });
//       const data = response.data;
//       console.log("Payment intent response:", data);

//       // Step 3: Confirm payment using clientSecret
//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: window.location.origin + "/dashboard/buy-renew-plan",
//         },
//         clientSecret: data.clientSecret,
//       });

//       if (error) {
//         console.error("Stripe/JS error:", error);
//       } else {
//         console.log("Payment successful!");
//       }
//     } catch (err) {
//       console.error("Error in handleSubmit:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// }

// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import axiosInstance from "../services/axiosInstance";

// export default function PaymentCardForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting payment...");

//     // Step 1: Call elements.submit() synchronously
//     const submitResult = await elements.submit();
//     console.log("Elements submitted:", submitResult);

//     if (!stripe || !elements) return;

//     try {
//       // Step 2: Create payment intent on your backend (can be async)
//       const response = await axiosInstance.post("/create-payment-intent", {
//         amount: 6500, // example
//         currency: "GBP"
//       });
//       const data = response.data;
//       console.log("Payment intent response:", data);

//       // Step 3: Confirm payment in SPA mode (no navigation)
//       const { paymentIntent, error } = await stripe.confirmPayment({
//         elements,
//         clientSecret: data.clientSecret,
//         redirect: "if_required", // prevents full page reload
//       });

//       if (error) {
//         console.error("Stripe/JS error:", error);
//       } else if (paymentIntent && paymentIntent.status === "succeeded") {
//         console.log("Payment successful!", paymentIntent);

//         // Delay for 1 minute to observe SPA
//         await new Promise(resolve => setTimeout(resolve, 60000));
//         console.log("1 minute passed after payment, SPA still intact.");
//       }
//     } catch (err) {
//       console.error("Error in handleSubmit:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// }

// ++++++++++++++++++++++++++++++++++++++ Wroking fine ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import axiosInstance from "../services/axiosInstance";

// export default function PaymentCardForm({ clientSecret, onPaymentSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     try {
//       console.log("Submitting payment...");

//       // Step 1: Get PaymentIntent ID from clientSecret
//       const paymentIntentId = clientSecret.split("_secret")[0]; // "pi_..."

//       // Step 2: Send to backend to confirm
//       const response = await axiosInstance.post("/confirm-payment", {
//         payment_intent_id: paymentIntentId,
//         payment_method_id: "pm_card_visa", // hardcoded or dynamic
//       });

//       console.log("Backend confirm response:", response.data);

//       if (response.data.success) {
//         console.log("Payment confirmed successfully!");
//         onPaymentSuccess?.(response.data);

//         // Optional: delay 1 minute to observe SPA
//         await new Promise((resolve) => setTimeout(resolve, 60000));
//         console.log("1 minute passed, SPA still intact.");
//       } else {
//         console.error("Payment confirmation failed:", response.data);
//       }
//     } catch (err) {
//       console.error("Error confirming payment:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-h-[26rem] overflow-y-auto overflow-x-hidden">
//       <PaymentElement />
//       <div className="flex justify-center items-center py-3">
//         <button
//           type="submit"
//           disabled={!stripe}
//           className="w-52 flex items-center justify-center gap-2  text-white py-3 rounded-xl font-semibold bg-blue-800"
//         >
//           Pay
//         </button>
//       </div>
//     </form>
//   );
// }
// // ++++++++++++++++++++++++++++++++++++++ Wroking fine ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




































// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import axiosInstance from "../services/axiosInstance";
// import toast from "react-hot-toast";

// export default function PaymentCardForm({ clientSecret, onPaymentSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     try {
//       console.log("Submitting payment...");

//       // Step 1: Get PaymentIntent ID from clientSecret
//       const paymentIntentId = clientSecret.split("_secret")[0]; // "pi_..."

//       // Step 2: Send to backend to confirm
//       const response = await axiosInstance.post("/confirm-payment", {
//         payment_intent_id: paymentIntentId,
//         payment_method_id: "pm_card_visa", // hardcoded or dynamic
//       });

//       console.log("Backend confirm response:", response.data);

//       if (response.data.success) {
//         console.log("Payment confirmed successfully!");
//         toast.success("Payment successful!");
//         onPaymentSuccess?.(response.data);
//       } else {
//         console.error("Payment confirmation failed:", response.data);
//         toast.error("Payment failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error confirming payment:", err);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-h-[26rem] overflow-y-auto overflow-x-hidden"
//     >
//       <PaymentElement />
//       <div className="flex justify-center items-center py-3">
//         <button
//           type="submit"
//           disabled={!stripe}
//           className="w-52 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold bg-blue-800"
//         >
//           Pay
//         </button>
//       </div>
//     </form>
//   );
// }






























































// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";

// export default function PaymentCardForm({ clientSecret, onPaymentSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     // Optional: prevent empty submission
//     const paymentElement = elements.getElement(PaymentElement);
//     if (!paymentElement) {
//       toast.error("Please fill in your card details.");
//       return;
//     }

//     try {
//       // Confirm payment using Stripe frontend
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         redirect: "if_required", // SPA-friendly
//       });

//       if (error) {
//         console.error("Stripe error:", error.message);
//         toast.error(error.message);
//         return;
//       }

//       if (paymentIntent?.status === "succeeded") {
//         toast.success("Payment successful!");
//         onPaymentSuccess?.(paymentIntent); // returns Stripe paymentIntent
//       } else {
//         toast.error("Payment not completed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-h-[26rem] overflow-y-auto overflow-x-hidden">
//       <PaymentElement />
//       <div className="flex justify-center items-center py-3">
//         <button
//           type="submit"
//           disabled={!stripe}
//           className="w-52 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold bg-blue-800"
//         >
//           Pay
//         </button>
//       </div>
//     </form>
//   );
// }
































import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PaymentCardForm({ clientSecret, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false); // new loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Optional: prevent empty submission
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      toast.error("Please fill in your card details.");
      return;
    }

    setIsLoading(true); // start loading / disable button
    try {
      // Confirm payment using Stripe frontend
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required", // SPA-friendly
      });

      if (error) {
        console.error("Stripe error:", error.message);
        toast.error(error.message);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        onPaymentSuccess?.(paymentIntent); // returns Stripe paymentIntent
        // Reset modal & state after success (React "refresh")
        elements.getElement(PaymentElement)?.clear(); // clears inputs
      } else {
        toast.error("Payment not completed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-h-[26rem] overflow-y-auto overflow-x-hidden">
      <PaymentElement />
      <div className="flex justify-center items-center py-3">
        <button
          type="submit"
          disabled={!stripe || isLoading} // disable during loading
          className={`w-52 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold bg-blue-800 ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
      </div>
    </form>
  );
}
