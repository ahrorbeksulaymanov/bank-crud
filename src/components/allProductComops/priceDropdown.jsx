import React, { useEffect, useState } from "react";
import { Slider, Dropdown, Menu, Input } from "antd";
import "./style.scss";
import { BsChevronDown } from "react-icons/bs";
import { Label } from "reactstrap";

const PriceDropdown = ({
  name,
  type,
  data,
  setCheckedList,
  checkedList,
  setRefresh,
  refresh,
}) => {

const [pricefrom, setpricefrom] = useState("")
const [priceto, setpriceto] = useState("")

  const filterData = () => {
    if(type === "price"){
      setCheckedList({
        brandId: checkedList.brandId,
        discountId: checkedList.discountId,
        seasonId: checkedList.seasonId,
        sizeId: checkedList.sizeId,
        genderId: checkedList.genderId,
        categiryId: checkedList.categiryId,
        colorId: checkedList.colorId,
        salePriceIn: [pricefrom, priceto],
      });
      setRefresh(!refresh)
    }
  };

  const menu = (
    <Menu className=" filter-checkbox">
      <div className="mx-2">
        <Label>Minimal narx</Label>
        <Input onChange={(e) => setpricefrom(e.target.value)} placeholder="dan..." type={"number"} />
        <Label>Maximal narx</Label>
        <Input onChange={(e) => setpriceto(e.target.value)} placeholder="gacha..." type={"number"} />
      </div>
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
export default React.memo(PriceDropdown);
