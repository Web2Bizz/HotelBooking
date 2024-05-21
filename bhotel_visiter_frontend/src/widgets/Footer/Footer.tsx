import "./style.scss";
import { Avatar, Button } from "antd";

const Footer = () => {
  const onSubscribe = () => {
    console.log("onSubscribe");
  };

  return (
    <div className="Footer-wrapper">
      <div>
        <div className="Footer-logo">
          <Avatar shape="square" size={90} src={null} />
          <p>Название сервиса</p>
        </div>
        <div className="Footer-links">
          <div style={{ marginRight: "150px" }}>
            <p>Компания</p>
            <a href="">О нас</a>
            <a href="">Контакты</a>
            <a href="">Обработка персональных данных</a>
            <a href="">Документы</a>
          </div>
          <div style={{ marginRight: "180px" }}>
            <p>Услуги</p>
            <a href="">Бронирование</a>
            <a href="">Отказ от брони</a>
          </div>
          <div style={{ marginRight: "125px" }}>
            <p>Магазин</p>
            <a href="">Отели</a>
            <a href="">Как заказать</a>
            <a href="">Акции и скидки</a>
          </div>
          <div className="Footer-button">
            <p>Рассылка</p>
            <span>
              Подписываясь на рассылку, я даю согласие на обработку персональных
              данных и на получение рекламных сообщений и новостей о товарах и
              услугах.
            </span>
            <Button type="primary" onClick={onSubscribe}>
              Подписаться
            </Button>
          </div>
        </div>
        <div className="Footer-copyright">
          <p>2024 © ООО «Название». Все права защищены</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
