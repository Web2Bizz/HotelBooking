import "./style.scss";

const PaymentCard = () => {
  return (
    <div className="PaymentCard-container">
      <div className="PaymentCard-img">
        <img style={{ marginTop: 10, width: 69, height: 26, backgroundPosition: '0, 0', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mir-logo.SVG.svg/512px-Mir-logo.SVG.svg.png" alt="payment-img" />
      </div>
      <div className="PaymentCard-text">
        <p>**** **** **** 1234</p>
      </div>
    </div>
  );
};

export default PaymentCard;
