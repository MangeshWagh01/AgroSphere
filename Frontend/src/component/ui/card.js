// src/components/ui/card.js
import React from "react";

export function Card({ children }) {
  return <div className="border rounded-2xl shadow-lg p-4 bg-white">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="text-lg font-bold mb-4">{children}</div>;
}

// src/components/ui/input.js
import React from "react";

export function Input({ ...props }) {
  return (
    <input
      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
      {...props}
    />
  );
}

// src/components/ui/label.js
import React from "react";

export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block font-medium mb-1">
      {children}
    </label>
  );
}

// src/components/ui/button.js
import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full"
      {...props}
    >
      {children}
    </button>
  );
}

// src/components/ui/select.js
import React, { useState } from "react";

export function Select({ onValueChange, value, children }) {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue);
    onValueChange(newValue);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="" disabled>
        Select an option
      </option>
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

// src/components/ui/alert.js
import React from "react";

export function Alert({ children, className }) {
  return <div className={`p-2 rounded-md ${className}`}>{children}</div>;
}
