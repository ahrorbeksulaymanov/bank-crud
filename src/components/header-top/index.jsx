import React, { useEffect, useState } from "react";
import './style.scss'
import { Radio } from "antd";
import { Input } from "antd";
import { getGenders } from "../../functions";
const { Search } = Input;

const HeaderTop = () => {
  const [genders, setgenders] = useState([])
  const [genderId, setgenderId] = useState(null)
  const onSearch = (value) => console.log(value);

  useEffect(() => {
    getGenders().then((res) => {
      if (res?.status === 200) {
        setgenders(res?.data?.data);
        localStorage.setItem("genderId", res?.data?.data[0]?.id)
      }
    });
  }, [])

  const changeGender = (id) => {
    localStorage.setItem("genderId", id);
    setgenderId(id)
  }
  return (
    <div>
      <div className="my-3 header-top-content">
      <Search
          placeholder="Search..."
          onSearch={onSearch}
          className='search_input2'
        />
        <Radio.Group className="radio_gender" value={genderId} buttonStyle="outline">
          {
            genders?.map((item, index) => (
              <Radio.Button onClick={() => changeGender(item?.id)} key={index} value={item?.id}>{item?.name}</Radio.Button>
            ))
          }
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
