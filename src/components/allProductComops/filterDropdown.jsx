import React, { useEffect } from "react";
import { Checkbox, Dropdown, Menu } from "antd";
import "./style.scss";
import { BsChevronDown } from "react-icons/bs";

const FilterDropdown = ({ name, data, setCheckedList, checkedList, setRefresh, refresh }) => {
  // const defaultCheckedList = data?.map((i) => i.id);
  const options = data?.map((i) => ({ label: i?.name, value: i.id }));

  useEffect(() => {
  }, [])
  
  const filterData = () => {
    setRefresh(!refresh);
    console.log("checkedList", checkedList);
  }
  
  const menu = (
    <Menu className=" filter-checkbox">
      <Checkbox.Group
        options={options}
        // defaultValue={defaultCheckedList}
        onChange={(e) => setCheckedList(e)}
      />
      <button onClick={filterData}>Filterlash</button>
    </Menu>
  );

  return (
    <div style={{ display: "inline-block", marginRight: "30px" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className="ant-dropdown-link text-dark"
          onClick={(e) => e.preventDefault()}
        >
          {name} <BsChevronDown />
        </a>
      </Dropdown>
    </div>
  );
};
export default FilterDropdown;
