import { Avatar } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../app/contexts/userContext";

const ProfileCard = () => {

  const navigate = useNavigate()

  const context = useContext(UserContext)
    
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
          <Avatar src={context.avatar} size={268} shape="circle" />
          <div className="ProfileCard-name">
            <p>{context.name} {context.surname} {context.fatherName}</p>
          </div>
        </div>
        <div className="ProfileCard-buttons">
          <ul className="PeculiaritiesRooms-custom-list">
            <li className="PeculiaritiesRooms-custom-list-item">
              <a onClick={() => navigate('/settings')}>Редактировать профиль</a>
            </li>
            <li className="PeculiaritiesRooms-custom-list-item">
              <a onClick={() => navigate('/payments')}>Способы оплаты</a>
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
