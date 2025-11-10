export default function Card({ children }) {
  return (
    <div className={"bg-white shadow-1g  rounded-2x1 sm:p-8 md:p-10 border border-gray-200 ${className} p-6 shadow mb-4"}>
      {children}
    </div>
  );
}
