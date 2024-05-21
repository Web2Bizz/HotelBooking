import { Avatar } from "antd";
import "./style.scss";

const ServiceCommentCard = () => {
  return (
    <div className="ServiceCommentCard-container">
      <div>
        <Avatar size={60} src={null} />
      </div>
      <div>
        <p>Небольшая фраза про классный сервис</p>
      </div>
    </div>
  );
};

export default ServiceCommentCard;
