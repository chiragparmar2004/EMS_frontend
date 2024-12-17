const CustomSwitchComponent = ({ checked, onChange, formik }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>

      {/* Status Box */}

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #cc1100;
          transition: 0.4s;
          border-radius: 10px;
        }

        .slider:before {
          position: absolute;
          content: "";
          width: 50%;
          height: 100%;
          border-radius: 10px;
          background-color: rgb(255, 255, 255);
          transition: 0.4s;
        }

        .switch input:checked + .slider {
          background-color: #21cc4c;
        }

        .switch input:checked + .slider:before {
          transform: translateX(100%);
        }
      `}</style>
    </div>
  );
};

export default CustomSwitchComponent;
