import "./features.scss";

type PROPS = {
  imgSrc: string;
  text: string;
};

export default function Size({ imgSrc, text }: PROPS) {
  return (
    <div className="size">
      <img src={imgSrc} alt="size" />
      <span>{text}</span>
    </div>
  );
}
