import DataBar from "./DataBar";

const AfterMatch = () => {
  const item = [
    ["name", 10, 20, 0.5],
    ["name2", 10, 20, 0.5],
    ["name3", 10, 20, 0.5],
    ["name4", 10, 20, 0.5],
  ];
  return (
    <>
      <div className="nes-container with-title is-rounded is-dark is-centered center column leaderbd">
        <p className="title">Match Result</p>

        <div className="nes-table-responsive">
          <table className="nes-table is-bordered is-dark">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Kills</th>
                <th>Deaths</th>
                <th>K/D Ratio</th>
                <th> Remarks </th>
              </tr>
            </thead>
            <tbody>
              {item.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <DataBar
                    type="armor"
                    currvalue={5 - index * 2}
                    totalvalue={5}
                  ></DataBar>
                  <hr />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AfterMatch;
