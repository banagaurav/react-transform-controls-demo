import React, { useState } from "react";

function Notification() {
  //   const [rotateScale, setRotateScale] = useState(1);
  var [name, setName] = useState("John");
  name = "bana";
  return <div>{console.log(name)}</div>;
}

export default Notification;
