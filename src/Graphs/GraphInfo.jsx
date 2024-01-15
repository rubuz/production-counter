import "./graphinfo.css";

const GraphInfo = (props) => {
  return (
    <div className="info__container">
      <ul>
        <li>
          <div className="li__title">
            <div className="info__dot dot1"></div>
            <div>
              <span>62100</span> Prikolice 1
            </div>
          </div>
          <div>{props.line62100}%</div>
        </li>
        <li>
          <div className="li__title">
            <div className="info__dot dot2"></div>
            <div>
              <span>62200</span> Astela & Alipna
            </div>
          </div>
          <div>{props.line62200}%</div>
        </li>
        <li>
          <div className="li__title">
            <div className="info__dot dot3"></div>
            <div>
              <span>63000</span> Avtodomi
            </div>
          </div>
          <div>{props.line63000}%</div>
        </li>
        <li>
          <div className="li__title">
            <div className="info__dot dot4"></div>
            <div>
              <span>63200</span> Sonic & Coral Supreme
            </div>
          </div>
          <div>{props.line63200}%</div>
        </li>
        <li>
          <div className="li__title">
            <div className="info__dot dot5"></div>
            <div>
              <span>65200</span> Van Bič
            </div>
          </div>
          <div>{props.line65200}%</div>
        </li>
        <li>
          <div className="li__title">
            <div className="info__dot dot6"></div>
            <div>
              <span>65300</span> Active Bič
            </div>
          </div>
          <div>{props.line65300}%</div>
        </li>
      </ul>
    </div>
  );
};

export default GraphInfo;
