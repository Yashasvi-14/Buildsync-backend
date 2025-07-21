import { Link } from "react-router-dom";

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="mb-8 text-3xl font-bold text-primary">🏢 BuildSync</div>
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
        {children}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        &larr; <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </p>
    </div>
  );
}
