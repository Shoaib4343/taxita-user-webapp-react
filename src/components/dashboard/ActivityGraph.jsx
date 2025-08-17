"use client";

import React from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", Returning: 275, New: 41 },
  { name: "Feb", Returning: 620, New: 96 },
  { name: "Mar", Returning: 202, New: 192 },
  { name: "Apr", Returning: 500, New: 50 },
  { name: "May", Returning: 355, New: 400 },
  { name: "Jun", Returning: 875, New: 200 },
  { name: "Jul", Returning: 700, New: 205 },
];

export const ActivityGraph = () => {
  return (
    <div className="col-span-8 bg-white overflow-hidden rounded-lg  shadow my-4" >
      <div className="p-4 border-b border-stone-200">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FiUser className="text-purple-600" /> User Activity
        </h3>
      </div>

      <div className="h-64 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-semibold"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-xs font-semibold"
            />
            <Tooltip
              contentStyle={{ fontSize: "0.875rem" }}
              labelStyle={{ color: "#6b7280" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="New"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Returning"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
