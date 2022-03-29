import React from "react";
import './style.scss'
import { Radio } from "antd";
import { Input } from "antd";
const { Search } = Input;

const HeaderTop = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div>
      <div className="my-3 header-top-content">
      <Search
          placeholder="Search..."
          onSearch={onSearch}
          className='search_input2'
        />
        <Radio.Group className="radio_gender" defaultValue="a" buttonStyle="outline">
          <Radio.Button value="a">WOMEN</Radio.Button>
          <Radio.Button value="b">MEN</Radio.Button>
          <Radio.Button value="c">CHILDREN</Radio.Button>
        </Radio.Group>
        <div>
          <Search
            placeholder="Search..."
            onSearch={onSearch}
            className='search_input'
          />
        </div>
      </div>
    </div>
  );
};
export default HeaderTop;
