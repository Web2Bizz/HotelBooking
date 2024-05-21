import { useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import "./style.scss";

type ImageGalleryProps = {
  images: string[];
};

const RoomsImg: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSet = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 < images.length ? prevIndex + 4 : 0
    );
  };

  const prevSet = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 >= 0
        ? prevIndex - 4
        : images.length - (images.length % 4 || 4)
    );
  };

  const mainImage = images[currentIndex];
  const galleryImages = images.slice(currentIndex + 1, currentIndex + 5);

  return (
    <div className="RoomsImg-container">
      <div className="RoomsImg-mainImg">
        <img src={mainImage} alt="Main" />
      </div>
      <div className="RoomsImg-miniImg">
        {images.length > 5 && (
          <Button onClick={prevSet}>
            <LeftOutlined />
          </Button>
        )}

        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery ${index}`}
            style={{ width: "24%", aspectRatio: "1" }}
          />
        ))}
        {images.length > 5 && (
          <Button onClick={nextSet}>
            <RightOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomsImg;
