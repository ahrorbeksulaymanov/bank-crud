import React from "react";
import { Dropdown, Menu } from "antd";
import { Checkbox, Divider } from "antd";
import "./style.scss";
import { BsChevronDown } from 'react-icons/bs'
const CheckboxGroup = Checkbox.Group;

const FilterDropdown = () => {
  const plainOptions = ["Apple", "Pear", "Orange"];
  const defaultCheckedList = ["Apple", "Orange"];
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [visibleDropdown, setvisibleDropdown] = React.useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const menu = (
    <Menu className="p-2 filter-checkbox">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider className="my-1" />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
      <button onClick={() => setvisibleDropdown(false)}>Filterlash</button>
    </Menu>
  );

  return (
    <div style={{display:"inline-block", marginRight:"30px"}} >
      <Dropdown overlay={menu} trigger={["click"]} visible={visibleDropdown}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="ant-dropdown-link text-dark" onClick={(e) => {e.preventDefault(); setvisibleDropdown(!visibleDropdown)}}>
          Sizes <BsChevronDown />
        </a>
      </Dropdown>
    </div>
  );
};
export default FilterDropdown;
