import { Toaster } from "react-hot-toast";

export default function ToastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-center" /> 
      {children}
    </>
  );
}
