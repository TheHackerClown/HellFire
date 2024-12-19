const Settings = () => {
  return (
    <>
      <div className="nes-container with-title is-rounded is-dark is-centered column">
        <p className="title">Settings</p>
        <h1>All these elements are placeholders and are fake</h1>
        <div className="is-dark">
          <label>
            <input
              type="radio"
              className="nes-radio is-dark"
              name="answer-dark"
            />
            <span>Yes</span>
          </label>

          <label>
            <input
              type="radio"
              className="nes-radio is-dark"
              name="answer-dark"
            />
            <span>No</span>
          </label>
        </div>
        <div className="is-dark">
          <label>
            <input type="checkbox" className="nes-checkbox is-dark" />
            <span>Dark</span>
          </label>
        </div>
        <div className="nes-field is-dark is-inline">
          <label className="is-dark">.input.is-dark</label>
          <input
            type="text"
            id="dark_field"
            className="nes-input is-dark"
            placeholder="dark.css"
          ></input>
        </div>

        <div className="is-dark">
          <label>nes-select.is-dark</label>
          <div className="nes-select is-dark">
            <select required id="dark_select">
              <option value="" disabled selected hidden>
                Select...
              </option>
              <option value="0">To be</option>
              <option value="1">Not to be</option>
            </select>
          </div>
        </div>
        <button type="button" className="nes-btn is-primary">
          Primary
        </button>
        <button type="button" className="nes-btn is-success">
          Success
        </button>
        <button type="button" className="nes-btn is-warning">
          Warning
        </button>
        <button type="button" className="nes-btn is-error">
          Error
        </button>
        <button type="button" className="nes-btn is-disabled">
          Disabled
        </button>
      </div>
    </>
  );
};

export default Settings;
