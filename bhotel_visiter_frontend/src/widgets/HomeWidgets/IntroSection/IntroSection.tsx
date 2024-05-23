import "./style.scss";

const IntroSection = () => {
  return (
    <div className="IntroSection-wrapper">
      <div className="IntroSection-container">
        <div className="IntroSection-img">
          <img src="https://placehold.co/555x675" alt="intro-img" />
        </div>
        <div className="IntroSection-text">
          <h1>Добро пожаловать в Три сосны</h1>
          <div>
            <p>
              Описание отеля тут должно быть какое-то наверное...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
