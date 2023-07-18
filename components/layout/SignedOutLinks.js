import React from "react";
import Link from "next/link";

const SignedOutLinks = () => {
  return (
    <ul>
      <li className="flex items-center gap-5">
        <Link href="/signup" className="p-1 rounded-md hover:bg-gray-600">
          Sign up
        </Link>
        <Link href="/signin" className="p-1 rounded-md hover:bg-gray-600">
          Login
        </Link>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
