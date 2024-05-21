import { Button } from "antd";
import "./style.scss";

const ThanksPage = () => {
  return (
    <div className="ThanksPage-wrapper">
      <div className="ThanksPage-container">
        <h1>Спасибо! Инфа в профиле будет</h1>
        <div className="ThanksPage-img">
          <img src="" alt="img" />
        </div>
        <div className="ThanksPage-buttons">
          <Button>На главную</Button>
          <Button type="primary">В профиль</Button>
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;
