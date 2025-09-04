// import React, { useEffect, useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentCardForm from "../components/PaymentCardForm";
// import { X, CreditCard, CheckCircle, ShieldCheck } from "lucide-react";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";
// import { Link } from "react-router-dom";
// import { plainsApi } from "../services/dashboard";

// const stripePromise = loadStripe(
//   "pk_test_51RzAMqJ7YX8KhvczfwoLXVfQff3N2nCA1UmGbx9wxc6k51N9g4ffSu8E01RbVjCmhlfEX54V7zSxkHnOGkUXAP6K00MZJXMz8U"
// );

// const BuyPlan = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentData, setPaymentData] = useState(null);

//   // new state for loading & disabling the button
//   const [isOpening, setIsOpening] = useState(false);

//   const openModal = async () => {
//     if (isOpening) return; // prevent double click

//     setIsOpening(true); // start loading / disable button
//     try {
//       console.log("Creating payment intent...");
//       const { data } = await axiosInstance.post("/create-payment-intent", {
//         amount: 300,
//         currency: "GBP",
//       });
//       console.log("Payment intent response:", data);
//       setClientSecret(data.clientSecret);
//       setIsModalOpen(true);
//     } catch (err) {
//       console.error("Failed to create payment intent:", err);
//       toast.error("Failed to create payment intent");
//     } finally {
//       setIsOpening(false); // stop loading
//     }
//   };

//   // fetching buy / renewal plans
//  useEffect(()=>{
//   const fetchPlans = async()=>{
//     try {
//        const res= await plainsApi();
//        console.log(res.data.data[0])

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   fetchPlans();
//  },[])

//   const features = [
//     "A copy of the Taxita Accounts",
//     "A copy of the HMRC submission receipt (time & date)",
//     "HMRC tax computation",
//     "A copy of the tax return submitted",
//     "Letter detailing HMRC payment deadlines",
//   ];

//   return (
//     <div className="min-h-screen p-8 bg-white rounded-2xl">

//        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-1">
//             Buy / Renew Plan
//           </h1>
//           <p className="text-gray-600">
//             Choose your subscription plan and get started with{" "}
//             <span className="font-semibold">Taxita</span>
//           </p>
//         </div>
//         <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
//           <Link to="/dashboard" className="hover:underline text-blue-600">
//             Dashboard
//           </Link>
//           <span className="mx-2">/</span>
//           <span>Buy/Renew Plan</span>
//         </div>
//       </div>

//       {/* Intro Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
//         <h2 className="text-xl font-bold text-gray-800 mb-2">HERE IS WHAT YOU GET!</h2>
//         <p className="text-gray-700">
//           With Taxita you get a full accountancy service with no further costs.
//         </p>
//       </div>

//       <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Features */}
//         <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
//           <h3 className="text-xl font-semibold mb-6">What’s included</h3>
//           <ul className="space-y-4">
//             {features.map((f, i) => (
//               <li key={i} className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
//                 <span>{f}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Payment Box */}
//         <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-8 flex flex-col justify-between">
//           <div className="text-center mb-8">
//             <p className="text-5xl font-extrabold">£2.00</p>
//             <p className="text-blue-100">per year</p>
//           </div>

//           <button
//             onClick={openModal}
//             disabled={isOpening} // disable button during loading
//             className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold ${
//               isOpening
//                 ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                 : "bg-white text-blue-600"
//             }`}
//           >
//             {isOpening ? "Loading..." : <><CreditCard className="w-5 h-5" /> Pay with Card</>}
//           </button>

//           <div className="flex items-center justify-center gap-2 text-sm text-blue-100 mt-6">
//             <ShieldCheck className="w-4 h-4" />
//             <p>Secure checkout powered by Stripe</p>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && clientSecret && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 pt-8">
//           <div className="relative w-full max-w-md">
//             <div className="bg-white rounded-2xl shadow-2xl w-full relative overflow-visible pt-16">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               <Elements stripe={stripePromise} options={{ clientSecret }}>
//                 <PaymentCardForm
//                   clientSecret={clientSecret}
//                   onClose={() => setIsModalOpen(false)}
//                   onPaymentSuccess={(data) => {
//                     console.log("Payment successful callback:", data);
//                     setPaymentData(data);
//                     setIsModalOpen(false); // close modal on success
//                     setClientSecret("");   // reset clientSecret
//                   }}
//                 />
//               </Elements>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyPlan;


































// import React, { useEffect, useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentCardForm from "../components/PaymentCardForm";
// import { X, CreditCard, CheckCircle, ShieldCheck } from "lucide-react";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosInstance";
// import { Link } from "react-router-dom";
// import { plainsApi } from "../services/dashboard";

// const stripePromise = loadStripe(
//   "pk_test_51RzAMqJ7YX8KhvczfwoLXVfQff3N2nCA1UmGbx9wxc6k51N9g4ffSu8E01RbVjCmhlfEX54V7zSxkHnOGkUXAP6K00MZJXMz8U"
// );

// const BuyPlan = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentData, setPaymentData] = useState(null);
//   const [isOpening, setIsOpening] = useState(false);
//   const [planData, setPlanData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetching buy / renewal plans
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await plainsApi();
//         console.log("Plan data:", res.data.data[0]);
//         setPlanData(res.data.data[0]);
//       } catch (error) {
//         console.log("Error fetching plans:", error);
//         toast.error("Failed to load plan data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   const openModal = async () => {
//     if (isOpening || !planData) return; // prevent double click and ensure plan data exists

//     setIsOpening(true); // start loading / disable button
//     try {
//       console.log("Creating payment intent...");
//       // Convert price to pence for Stripe (multiply by 100)
//       const amount = Math.round(parseFloat(planData.price) * 100);

//       const { data } = await axiosInstance.post("/create-payment-intent", {
//         amount: amount,
//         currency: "GBP",
//         // plan_id: planData.id, // Optional: send plan ID for tracking
//       });
//       console.log("Payment intent response:", data);
//       setClientSecret(data.clientSecret);
//       setIsModalOpen(true);
//     } catch (err) {
//       console.error("Failed to create payment intent:", err);
//       toast.error("Failed to create payment intent");
//     } finally {
//       setIsOpening(false); // stop loading
//     }
//   };

//   const features = [
//     "A copy of the Taxita Accounts",
//     "A copy of the HMRC submission receipt (time & date)",
//     "HMRC tax computation",
//     "A copy of the tax return submitted",
//     "Letter detailing HMRC payment deadlines",
//   ];

//   // Show loading state while fetching plan data
//   if (loading) {
//     return (
//       <div className="min-h-screen p-8 bg-white rounded-2xl">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-gray-500">Loading plan details...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-8 bg-white rounded-2xl">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-1">
//             Buy / Renew Plan
//           </h1>
//           <p className="text-gray-600">
//             Choose your subscription plan and get started with{" "}
//             <span className="font-semibold">Taxita</span>
//           </p>
//         </div>
//         <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
//           <Link to="/dashboard" className="hover:underline text-blue-600">
//             Dashboard
//           </Link>
//           <span className="mx-2">/</span>
//           <span>Buy/Renew Plan</span>
//         </div>
//       </div>

//       {/* Intro Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
//         <h2 className="text-xl font-bold text-gray-800 mb-2">
//           HERE IS WHAT YOU GET!
//         </h2>
//         <p className="text-gray-700">
//           With Taxita you get a full accountancy service with no further costs.
//         </p>
//       </div>

//       <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Features */}
//         <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
//           <h3 className="text-xl font-semibold mb-6">What's included</h3>
//           <ul className="space-y-4">
//             {features.map((f, i) => (
//               <li key={i} className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
//                 <span>{f}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Payment Box - Now Dynamic */}
//         <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-8 flex flex-col justify-between">
//           <div className="text-center mb-8">
//             {/* Plan Title */}
//             <div className="mb-3">
//               <h3 className="text-xl font-bold text-blue-100">
//                 {planData?.title || "Plan"}
//               </h3>
//             </div>

//             {/* Dynamic Price */}
//             <p className="text-5xl font-extrabold">
//               £{planData?.price || "0.00"}
//             </p>

//             {/* Plan Duration */}

//             {/* Plan Session (Standard 2025–2026) */}
//             <p className="text-sm font-medium text-blue-200 mb-3">
//               Standard for 2025–2026
//             </p>
//           </div>

//           <button
//             onClick={openModal}
//             disabled={isOpening || !planData} // disable button during loading or if no plan data
//             className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
//               isOpening || !planData
//                 ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                 : "bg-white text-blue-600 hover:bg-gray-50"
//             }`}
//           >
//             {isOpening ? (
//               "Loading..."
//             ) : (
//               <>
//                 <CreditCard className="w-5 h-5" /> Pay with Card
//               </>
//             )}
//           </button>

//           <div className="flex items-center justify-center gap-2 text-sm text-blue-100 mt-6">
//             <ShieldCheck className="w-4 h-4" />
//             <p>Secure checkout powered by Stripe</p>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && clientSecret && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 pt-8">
//           <div className="relative w-full max-w-md">
//             <div className="bg-white rounded-2xl shadow-2xl w-full relative overflow-visible pt-16">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               <Elements stripe={stripePromise} options={{ clientSecret }}>
//                 <PaymentCardForm
//                   clientSecret={clientSecret}
//                   planData={planData} // Pass plan data to the form
//                   onClose={() => setIsModalOpen(false)}
//                   onPaymentSuccess={(data) => {
//                     console.log("Payment successful callback:", data);
//                     setPaymentData(data);
//                     setIsModalOpen(false); // close modal on success
//                     setClientSecret(""); // reset clientSecret
//                   }}
//                 />
//               </Elements>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyPlan;































import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCardForm from "../components/PaymentCardForm";
import { X, CreditCard, CheckCircle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import { plainsApi } from "../services/dashboard";

const stripePromise = loadStripe(
  "pk_test_51RzAMqJ7YX8KhvczfwoLXVfQff3N2nCA1UmGbx9wxc6k51N9g4ffSu8E01RbVjCmhlfEX54V7zSxkHnOGkUXAP6K00MZJXMz8U"
);

const BuyPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching buy / renewal plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await plainsApi();
        console.log("Plan data:", res.data.data[0]);
        setPlanData(res.data.data[0]);
      } catch (error) {
        console.log("Error fetching plans:", error);
        toast.error("Failed to load plan data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const openModal = async () => {
    if (isOpening || !planData) return; // prevent double click and ensure plan data exists

    setIsOpening(true); // start loading / disable button
    try {
      console.log("Creating payment intent...");
      // Convert price to pence for Stripe (multiply by 100)
      const amount = Math.round(parseFloat(planData.price) * 100);

      const { data } = await axiosInstance.post("/create-payment-intent", {
        amount: amount,
        currency: "GBP",
        // plan_id: planData.id, // Optional: send plan ID for tracking
      });
      console.log("Payment intent response:", data);
      setClientSecret(data.clientSecret);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to create payment intent:", err);
      toast.error("Failed to create payment intent");
    } finally {
      setIsOpening(false); // stop loading
    }
  };

  const features = [
    "A copy of the Taxita Accounts",
    "A copy of the HMRC submission receipt (time & date)",
    "HMRC tax computation",
    "A copy of the tax return submitted",
    "Letter detailing HMRC payment deadlines",
  ];

  // Show loading state while fetching plan data
  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-white rounded-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading plan details...</div>
        </div>
      </div>
    );
  }

  // Elements options with manual payment method creation
  const elementsOptions = {
    clientSecret,
    paymentMethodCreation: 'manual', // This is the key fix!
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className="min-h-screen p-8 bg-white rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Buy / Renew Plan
          </h1>
          <p className="text-gray-600">
            Choose your subscription plan and get started with{" "}
            <span className="font-semibold">Taxita</span>
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
          <Link to="/dashboard" className="hover:underline text-blue-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span>Buy/Renew Plan</span>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          HERE IS WHAT YOU GET!
        </h2>
        <p className="text-gray-700">
          With Taxita you get a full accountancy service with no further costs.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Features */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6">What's included</h3>
          <ul className="space-y-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Box - Now Dynamic */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-8 flex flex-col justify-between">
          <div className="text-center mb-8">
            {/* Plan Title */}
            <div className="mb-3">
              <h3 className="text-xl font-bold text-blue-100">
                {planData?.title || "Plan"}
              </h3>
            </div>

            {/* Dynamic Price */}
            <p className="text-5xl font-extrabold">
              £{planData?.price || "0.00"}
            </p>

            {/* Plan Duration */}

            {/* Plan Session (Standard 2025–2026) */}
            <p className="text-sm font-medium text-blue-200 mb-3">
              Standard for 2025–2026
            </p>
          </div>

          <button
            onClick={openModal}
            disabled={isOpening || !planData} // disable button during loading or if no plan data
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isOpening || !planData
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-gray-50"
            }`}
          >
            {isOpening ? (
              "Loading..."
            ) : (
              <>
                <CreditCard className="w-5 h-5" /> Pay with Card
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-blue-100 mt-6">
            <ShieldCheck className="w-4 h-4" />
            <p>Secure checkout powered by Stripe</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && clientSecret && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 pt-8">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl w-full relative overflow-visible pt-16">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Fixed Elements component with manual payment method creation */}
              <Elements stripe={stripePromise} options={elementsOptions}>
                <PaymentCardForm
                  clientSecret={clientSecret}
                  planData={planData} // Pass plan data to the form
                  onClose={() => setIsModalOpen(false)}
                  onPaymentSuccess={(data) => {
                    console.log("Payment successful callback:", data);
                    setPaymentData(data);
                    setIsModalOpen(false); // close modal on success
                    setClientSecret(""); // reset clientSecret
                  }}
                />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPlan;