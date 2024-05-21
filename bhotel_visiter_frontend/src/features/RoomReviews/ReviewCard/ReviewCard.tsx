import { Avatar, Rate } from "antd";
import "./style.scss";

const ReviewCard = () => {
  return (
    <div className="ReviewCard-container">
      <div className="ReviewCard-header">
        <div className="ReviewCard-header__user">
          <Avatar size={40} src={null} />
          <div>
            <p>Мария Н.</p>
            <span>22.03.2023</span>
          </div>
        </div>
        <Rate disabled={true} />
      </div>
      <div className="ReviewCard-text">
        <p>
          Ножки очень туго прикручиваются на саморезы, приготовьте шуруповёрт
          или хорошую отвёртку. У передних ножек внешний "чехол" надевается на
          прикрученную к креслу основу, и ничем, кроме веса самого кресла, там
          не крепится. Может доставить неудобства при перемещении. В остальном -
          отличная вещь.
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
