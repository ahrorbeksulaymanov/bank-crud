import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const NotFound = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
      extra={<Button onClick={() => history.goBack()} type="primary">Orqaga</Button>}
    />
  );
};

export default NotFound;
