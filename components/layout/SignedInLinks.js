import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signoutUser } from "@redux/projectSlice ";
import Cookies from "js-cookie";
import { collection, getDocs } from "firebase/firestore";
import { db, app } from "@config/firebaseConfig ";
import { useRouter } from "next/navigation";

const SignedInLinks = () => {
  const [userInitials, setUserInitials] = useState("");
  const dispatch = useDispatch();
  const currentUser = Cookies.get("user");

  const route = useRouter();
  const handleSignout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        dispatch(signoutUser());
        Cookies.remove("user");
      })
      .catch((error) => {
        error;
      });
    route.replace("/signin");
  };

  const getUserInitials = async () => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    const userFromDb = usersList.find((user) => user.id === currentUser);

    const userInitials = userFromDb?.initials;
    userInitials && setUserInitials(userInitials);
  };
  useEffect(() => {
    getUserInitials();
  }, []);

  return (
    <ul className="flex items-center gap-5">
      <li>
        <Link href="/create" className="p-1 rounded-md hover:bg-gray-600">
          New Project
        </Link>
      </li>
      <li>
        <a
          className="p-1 rounded-md cursor-pointer hover:bg-gray-600"
          onClick={handleSignout}
        >
          Log Out
        </a>
      </li>
      <li>
        <Link
          href="/"
          className="bg-pink-600 rounded-[50%]  w-[30px] h-[30px] flex justify-center items-center"
        >
          <span className="tracking-[2px] text-[10px]">{userInitials}</span>
        </Link>
      </li>
    </ul>
  );
};

export default SignedInLinks;
