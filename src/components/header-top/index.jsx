import React from "react";
import { Radio } from "antd";
import { Input } from "antd";
const { Search } = Input;

const HeaderTop = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <Radio.Group defaultValue="a" buttonStyle="outline">
          <Radio.Button value="a">WOMEN</Radio.Button>
          <Radio.Button value="b">MEN</Radio.Button>
          <Radio.Button value="c">CHILDREN</Radio.Button>
        </Radio.Group>
        <Search
          placeholder="Search..."
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
};
export default HeaderTop;
