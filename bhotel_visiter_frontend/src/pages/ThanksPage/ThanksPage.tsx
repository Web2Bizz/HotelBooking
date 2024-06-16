import { Button } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const ThanksPage = () => {

  const navigate = useNavigate()

  return (
    <div className="ThanksPage-wrapper">
      <div className="ThanksPage-container">
        <h1>Спасибо! Информация будет в профиле</h1>
        <div className="ThanksPage-img">
          <img src="" alt="img" />
        </div>
        <div className="ThanksPage-buttons">
          <Button onClick={() => navigate('/')}>На главную</Button>
          <Button type="primary" onClick={() => navigate('/profile')}>В профиль</Button>
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;
