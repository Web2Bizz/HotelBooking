import { Collapse } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import type { CollapseProps } from "antd";
import type { CSSProperties } from "react";

import "./style.scss";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const FAQSection = () => {
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#A3A3A3",
    borderRadius: 15,
    border: "none",
  };

  return (
    <div className="FAQSection-container">
      <div>
        <h1>Часто задаваемые вопросы</h1>
      </div>
      <div className="FAQSection-collapse">
        <Collapse
          bordered={false}
          expandIconPosition="end"
          expandIcon={({ isActive }) =>
            isActive ? <MinusOutlined /> : <PlusOutlined />
          }
          items={getItems(panelStyle)}
          style={{ background: "#A3A3A3" }}
        />
      </div>
    </div>
  );
};

export default FAQSection;
