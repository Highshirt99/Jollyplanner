import React, { useEffect, useState } from "react";
import Link from "next/link";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setAuth } from "@redux/projectSlice ";
import { useDispatch } from "react-redux";
import { app } from "@config/firebaseConfig ";
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);
  const currentUser = Cookies.get("user");

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
  
      if (user) {
        const uid = user.uid;
        setUid(uid);
        dispatch(setAuth());
      } else if (!user) {
     
        setUid(null);
      }
    });
  }, []);

  return (
    <nav className="w-full h-[50px] z-[10000]  py-3 lg:px-[7rem] px-[2rem] bg-gray-500">
      <div className="flex justify-between text-[12px] items-center  text-white">
        <Link href="/">JollyPlanner</Link>
        {uid ? <SignedInLinks /> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
