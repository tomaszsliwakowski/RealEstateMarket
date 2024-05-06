type PROPS = {
  imgSrc: string;
  title: string;
  text: string;
};

export default function Feature({ imgSrc, title, text }: PROPS) {
  return (
    <div className="feature">
      <img src={imgSrc} alt="feature" />
      <div className="featureText">
        <span>{title}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}
