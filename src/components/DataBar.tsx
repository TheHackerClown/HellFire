interface DataBarProps {
  type: string;
  totalvalue: number;
  currvalue: number;
}

const DataBar = ({ type, totalvalue, currvalue }: DataBarProps) => {
  let data = new Array(totalvalue);
  let pointer = Math.floor(currvalue);

  if (type === "health") {
    type = "heart";
  } else {
    type = "star";
  }
  if (totalvalue == currvalue) {
    for (let i = 0; i < totalvalue; i++) {
      data[i] = 2;
    }
  } else {
    for (let i = 0; i < totalvalue; i++) {
      if (i <= Math.floor(currvalue)) {
        data[i] = 2;
      } else if (i > Math.floor(currvalue) && pointer > 0) {
        data[i] = 1;
        pointer = 0;
      } else {
        data[i] = 0;
      }
    }
  }

  function returnstate(val: number) {
    switch (val) {
      case 2:
        return "";
      case 1:
        return "is-half";
      case 0:
        return "is-empty";
    }
  }
  return (
    <section className="icon-list row">
      {data.map((value, index) => (
        <>
          <i
            className={`nes-icon icons ${returnstate(value)} ${type}`}
            key={index}
          ></i>
        </>
      ))}
    </section>
  );
};

export default DataBar;
