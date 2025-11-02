export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        {children}
      </div>
    </div>
  );
}
