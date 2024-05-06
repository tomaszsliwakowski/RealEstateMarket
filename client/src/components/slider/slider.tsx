import { useState } from "react";
import "./slider.scss";

type PORPS = {
  images: Array<string>;
};

export default function Slider({ images }: PORPS) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const changeIndex = (index: number | null) => {
    setImageIndex(index);
  };

  const changeSlide = (direction: string) => {
    if (imageIndex === null) return;
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null ? (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="./arrow.png" alt="arrow" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="image" />
          </div>
          <div className="arrow">
            <img
              src="./arrow.png"
              alt="arrow"
              className="right"
              onClick={() => changeSlide("right")}
            />
          </div>
          <div className="close" onClick={() => changeIndex(null)}>
            X
          </div>
        </div>
      ) : null}
      <div className="bigImage">
        <img src={images[0]} alt="image" onClick={() => changeIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image: string, index: number) => (
          <img
            src={image}
            alt="image"
            key={index}
            onClick={() => changeIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}
