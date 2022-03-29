import React from "react";
import { List, Avatar } from "antd";

const Articles = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <div className="py-5">
      <h5>Foydali maqolalar</h5>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ borderRadius: "0", width: "60px", height: "60px" }}
                  src="https://joeschmoe.io/api/v1/random"
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description={<p className="articl_length">Ant Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED Team</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default Articles;
