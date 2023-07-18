"use client";
import Navbar from "@components/layout/Navbar ";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@redux/store ";

export default function RootLayout({ children }) {
  // function AuthIsLoaded({ children }) {
  //   const auth = useSelector(state => state.firebase.auth)
  //   if (!isLoaded(auth)) return <div>splash screen...</div>;
  //   return children
  // }

  return (
    <html lang="en">
      <Provider store={store}>
        <body className="font-bodyFont bg-blue-500 h-[100vh]">
          <>
            <Navbar />
            {children}
          </>
        </body>
      </Provider>
    </html>
  );
}
