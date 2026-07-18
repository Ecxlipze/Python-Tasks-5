import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
              <Navbar />

              <main className="flex-1 bg-slate-100 p-6">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}