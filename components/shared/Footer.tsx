"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">RentNest</h2>
          <p className="text-sm text-gray-400 mt-1">
            Simplifying rental requests and property management.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}