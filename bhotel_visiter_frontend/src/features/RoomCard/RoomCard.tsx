import { StarFilled } from "@ant-design/icons";
import { Divider, Tag } from "antd";
import "./style.scss";

const RoomCard = () => {
  return (
    <div className="RoomCard-wrapper">
      <div className="RoomCard-container">
        <div className="RoomCard-img">
          <img src="" alt="room-img" />
        </div>
        <div className="RoomCard-info">
          <p style={{ fontSize: "16px" }}>
            Двухкомнатный номер в городе Димитровград
          </p>
          <div className="RoomCard-info__rate">
            <p>Черемшан</p>
            <div>
              <StarFilled />
              <span>4.56</span>
            </div>
          </div>
          <Divider />
          <div className="RoomCard-info__facility">
            <p>3 гостя • 1 ванная • 3 кровати • Кондицинер • Вай-фай</p>
          </div>
          <div className="RoomCard-info__price">
            <div className="RoomCard-info__price__tag">
              <Tag>-15%</Tag>
            </div>
            <div>
              <p>31$ / ночь</p>
              <span>31$ / ночь</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;