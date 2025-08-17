// "use client";

// import React, { useState } from "react";
// import { FiCommand, FiSearch } from "react-icons/fi";
// import { CommandMenu } from "./CommandMenu";

// export const Search = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div
//         onClick={() => setOpen(true)}
//         className="group cursor-pointer mb-4 relative rounded-lg flex items-center px-3 py-2 text-sm 
//                    border border-stone-300 bg-white shadow-sm transition-all duration-200
//                    hover:border-stone-400 hover:shadow-md focus-within:border-stone-500"
//       >
//         {/* Search Icon */}
//         <FiSearch className="mr-2 text-stone-500 group-hover:text-stone-700 transition-colors" />

//         {/* Placeholder */}
//         <span className="text-stone-500 select-none group-hover:text-stone-700 transition-colors">
//           Search...
//         </span>

//         {/* Shortcut Badge */}
//         <span
//           className="p-1 text-xs flex gap-0.5 items-center bg-stone-100 rounded-md absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 border border-stone-200 shadow-sm group-hover:bg-stone-200 transition-colors"
//         >
//           <FiCommand className="w-3 h-3" />K
//         </span>
//       </div>

//       <CommandMenu open={open} setOpen={setOpen} />
//     </>
//   );
// };























// "use client";

// import React, { useState } from "react";
// import { FiCommand, FiSearch } from "react-icons/fi";
// import { CommandMenu } from "./CommandMenu";

// export const Search = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div
//         onClick={() => setOpen(true)}
//         className="group cursor-pointer mb-4 relative rounded-lg flex items-center px-3 py-2 text-sm 
//                    border border-gray-200 bg-white shadow-sm transition-all duration-200
//                    hover:border-gray-300 hover:shadow-md focus-within:border-gray-400"
//       >
//         {/* Search Icon */}
//         <FiSearch className="mr-2 text-gray-500 group-hover:text-gray-700 transition-colors" />

//         {/* Placeholder */}
//         <span className="text-gray-500 select-none group-hover:text-gray-700 transition-colors">
//           Search...
//         </span>

//         {/* Shortcut Badge */}
//         <span
//           className="p-1 text-xs flex gap-0.5 items-center bg-gray-100 rounded-md absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 border border-gray-200 shadow-sm group-hover:bg-gray-200 transition-colors"
//         >
//           <FiCommand className="w-3 h-3" />K
//         </span>
//       </div>

//       {/* Command Menu */}
//       <CommandMenu open={open} setOpen={setOpen} />
//     </>
//   );
// };



"use client";
import React, { useState } from "react";
import { FiCommand, FiSearch } from "react-icons/fi";
import { CommandMenu } from "./CommandMenu";

export const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer mb-4 relative rounded-lg flex items-center px-3 py-2 text-sm 
                   border border-gray-200 bg-blue-50 shadow-sm transition-all duration-200
                   hover:border-gray-300 hover:shadow-md focus-within:border-gray-400"
      >
        <FiSearch className="mr-2 text-gray-500 group-hover:text-gray-700 transition-colors" />
        <span className="text-gray-500 select-none group-hover:text-gray-700 transition-colors">
          Search...
        </span>
        <span
          className="p-1 text-xs flex gap-0.5 items-center bg-white rounded-md absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 border border-gray-200 shadow-sm group-hover:bg-gray-50 transition-colors"
        >
          <FiCommand className="w-3 h-3" />K
        </span>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};
