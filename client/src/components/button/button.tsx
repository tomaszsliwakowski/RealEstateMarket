type PROPS = {
  imgSrc: string;
  name?: string;
};

export default function Button({ imgSrc, name }: PROPS) {
  return (
    <button>
      <img src={imgSrc} alt="button" />
      {name}
    </button>
  );
}
