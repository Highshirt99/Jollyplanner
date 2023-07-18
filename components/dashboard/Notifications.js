import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@config/firebaseConfig ";
import moment from "moment";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    const notificationsRef = collection(db, "notifications");
    const notificationsSnapshot = await getDocs(notificationsRef);
    let notificationsList = notificationsSnapshot.docs.map((doc) => doc.data());

    notificationsList.sort((a, b) => b.time - a.time);
    notificationsList = notificationsList.slice(0, 11);

    setNotifications(notificationsList);
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="px-3 py-[1rem] relative bottom-2 lg:bottom-0 tab:bottom-0 midi:bottom-0 lg:mt-[2rem] tab:mt-[2rem] midi:mt-[2rem] rounded-md h-auto bg-white w-[320px] lg:w-[300px]">
      <h1 className="text-[18px] mb-3">Notifications</h1>
      <ul className="text-[12px]">
        {notifications?.map((item) => (
          <li key={item.id}>
            <span className="text-pink-600">{item.user} </span>
            <span className="">{item.content} </span>
            <div className="text-gray-400 text-[10px]">
              {moment(item.time.toDate()).fromNow()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
