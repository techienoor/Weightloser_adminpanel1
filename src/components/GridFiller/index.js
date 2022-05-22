const GridFiller = ({ length = 6 }) => {
  return (
    <>
      {Array.from({ length }, (_, i) => i + 1).map((m) => (
        <div key={m.toString()}></div>
      ))}
    </>
  );
};

export default GridFiller;
