import React, { useEffect, useState } from "react";
import './style.scss'
import { Radio } from "antd";
import { Input } from "antd";
import { getGenders } from "../../functions";
import { useDispatch, useSelector } from "react-redux"
import { GENDER_VAL, SEARCH_VAL } from "../../redux/actions";
import { useHistory, useLocation } from "react-router-dom";
const { Search } = Input;

const HeaderTop = () => {
  const searchVal = useSelector((state) => state?.product);
  const [genders, setgenders] = useState([])
  const [genderId, setgenderId] = useState(searchVal?.gender_val)
  const [search_val, setsearch_val] = useState(searchVal?.search_val)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation();

  const onSearch = (value) => {
    dispatch({ type: SEARCH_VAL, data: {search_val: value, gender_val: genderId} })
    if(location.pathname !== '/'){
      history.push("/all-products")
    }
  }

  useEffect(() => {
    getGenders().then((res) => {
      if (res?.status === 200) {
        setgenders(res?.data?.data);
      }
    });
  }, [])

  const changeGender = (id) => {
    setgenderId(id)
    dispatch({ type: GENDER_VAL, data: {search_val: search_val, gender_val: id} })
    if(location.pathname !== '/'){
      history.push("/all-products")
    }
  }
  return (
    <div>
      <div className="my-3 header-top-content">
        <>
          <Search
              placeholder="Qidirish..."
              onSearch={onSearch}
              className='search_input2'
              onChange={(e)=>setsearch_val(e.target.value)}
              value={search_val}
            />
            <Radio.Group className="radio_gender" value={genderId} buttonStyle="outline">
              {
                genders?.map((item, index) => (
                  <Radio.Button onClick={() => changeGender(item?.id)} key={index}  value={item?.id}>{item?.name}</Radio.Button>
                ))
              }
            </Radio.Group>
            <div>
              <Search
                placeholder="Qidirish..."
                onSearch={onSearch}
                className='search_input'
                onChange={(e)=>setsearch_val(e.target.value)}
                value={search_val}
              />
            </div>
        </>
      </div>
    </div>
  );
};
export default HeaderTop;
