import React from "react";

interface IPropTypes {
  component: React.ReactNode;
}

export default function Card({ component }: IPropTypes) {
  return (
    <div className="block min-w-64 max-w-64 p-4 bg-gray-600 border border-gray-700 rounded-lg shadow hover:bg-gray-700">
      {component}
    </div>
  );
}
