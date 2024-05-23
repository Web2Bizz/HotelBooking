import { Avatar, Rate } from "antd";
import "./style.scss";

export type TReviews = {
  avatarUrl: string
  name: string
  surname: string
  message: string
  rating: number
}

const ReviewCard = (props: TReviews) => {

  const { avatarUrl, name, surname, rating, message } = props 

  return (
    <div className="ReviewCard-container">
      <div className="ReviewCard-header">
        <div className="ReviewCard-header__user">
          <Avatar size={40} src={avatarUrl} />
          <div>
            <p>{name} {surname[0]}.</p>
            <span>22.03.2023</span>
          </div>
        </div>
        <Rate value={rating} disabled={true} />
      </div>
      <div className="ReviewCard-text">
        <p>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
