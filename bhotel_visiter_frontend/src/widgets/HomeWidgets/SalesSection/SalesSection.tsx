import { Carousel } from "antd";
import "./style.scss";

const SalesSection = () => {
  return (
    <div className="SalesSection-container">
      <Carousel autoplay>
        <div className="SalesSection-carouselContent">
          <div className="SalesSection-example">
            <p>
              <span>Скидка 15%</span> на первое бронирование!
            </p>
            <p>Подробности скидка ура дешево скидка скидка</p>
          </div>
        </div>
        <div className="SalesSection-carouselContent">
          <div className="SalesSection-example">
            <p>
              <span>Скидка 20%</span> на первое бронирование!
            </p>
            <p>Подробности скидка ура дешево скидка скидка</p>
          </div>
        </div>
        <div className="SalesSection-carouselContent">
          <div className="SalesSection-example">
            <p>
              <span>Скидка 40%</span> на первое бронирование!
            </p>
            <p>Подробности скидка ура дешево скидка скидка</p>
          </div>
        </div>
        <div className="SalesSection-carouselContent">
          <div className="SalesSection-example">
            <p>
              <span>Скидка 70%</span> на первое бронирование!
            </p>
            <p>Подробности скидка ура дешево скидка скидка</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default SalesSection;
