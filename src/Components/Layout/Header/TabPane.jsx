import React, { useEffect, useState } from "react";
import UserTab from "../../User/UserTab";
import DoctorTab from "../../Doctor/DoctorTab";
import DrugStoreTab from "../../DrugStrore/DrugStoreTab";
import AdminTab from "../../Admin/AdminTab";
import { useTokenContext } from "../../Context/TokenContext"; // TokenContext 불러오기

import "../../../css/Style.css";

const TabPane = () => {
  const { userAuth } = useTokenContext(); // TokenContext로부터 memberAuth 가져오기
  const [defaultTab, setDefaultTab] = useState(<UserTab />);

  useEffect(() => {
    // memberAuth가 변경될 때마다 업데이트
    switch (userAuth) {
      case "D":
        setDefaultTab(<DoctorTab />);
        break;
      case "S":
        setDefaultTab(<DrugStoreTab />);
        break;
      case "A":
        setDefaultTab(<AdminTab />);
        break;
      default:
        setDefaultTab(<UserTab />);
        break;
    }
  }, [userAuth]);

  return (
    <div className="tabPane">
      <div className="tabContainer">{defaultTab}</div>
    </div>
  );
};

export default TabPane;
