import { Avatar } from "antd";
import "./style.scss";

const ProfileCard = () => {
  return (
    <div className="ProfileCard-container">
      <div className="ProfileCard-title">
        <p>Профиль</p>
      </div>
      <div className="ProfileCard-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar src={null} size={268} shape="circle" />
          <div className="ProfileCard-name">
            <p>Николай Супер Классный</p>
          </div>
        </div>
        <div className="ProfileCard-buttons">
          <ul className="PeculiaritiesRooms-custom-list">
            <li className="PeculiaritiesRooms-custom-list-item">
              <a href="">Редактировать профиль</a>
            </li>
            <li className="PeculiaritiesRooms-custom-list-item">
              <a href="">Способы оплаты</a>
            </li>
            <li className="PeculiaritiesRooms-custom-list-item">
              <a href="">Справка</a>
            </li>
            <li className="PeculiaritiesRooms-custom-list-item">
              <a href="">Выйти</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
