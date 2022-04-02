import React, { useEffect, useState } from "react";
import './style.scss'
import { Radio } from "antd";
import { Input } from "antd";
import { getGenders } from "../../functions";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { GENDER_VAL, SEARCH_VAL } from "../../redux/actions";
const { Search } = Input;

const HeaderTop = () => {
  const [genders, setgenders] = useState([])
  const [genderId, setgenderId] = useState('')
  const [search, setsearch] = useState('')
  const dispatch = useDispatch()
  
  const onSearch = (value) => {
    setsearch(value)
    dispatch({ type: SEARCH_VAL, data: {search_val: value, gender_val: genderId} })
  }

  const location = useLocation();

  useEffect(() => {
    getGenders().then((res) => {
      if (res?.status === 200) {
        setgenders(res?.data?.data);
      }
    });
  }, [])

  const changeGender = (id) => {
    setgenderId(id)
    dispatch({ type: GENDER_VAL, data: {search_val: search, gender_val: id} })
  }
  return (
    <div>
      <div className="my-3 header-top-content">
        {
          location.pathname === "/all-products" || location.pathname === "/"? 
        <>
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
        </>:<div style={{height:"32px"}}></div>
        }
      </div>
    </div>
  );
};
export default HeaderTop;
