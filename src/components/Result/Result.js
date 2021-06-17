import React from "react";
import Image from "react-bootstrap/Image";
export default function Result() {
  return (
    <div className="wapper__faculty" style={{ marginTop: "3%", zIndex: "-2" }}>
      <div className='logo__faculty'>
        <Image
          src={localStorage.getItem("logo")}
          style={{
          }}
          alt="iconchonkhoa"
        />
      </div>

      <div className="result__wapper">
        <div style={{ display: "flex", marginLeft: "70px" }}>
          <Image
            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/note-icon.svg"
            alt="iconchonkhoa"
          />
          <h3 style={{ marginLeft: "15px", marginTop: "18px" }}>
            Kết quả chẩn đoán
          </h3>
        </div>
        <div className="result__ketqua">
          <div className="ketqua__benh">
            Chào bạn, bạn có thể bị: <strong>{localStorage.getItem("Name")}</strong>
          </div>
          <div className="ketqua__khoa">
            {" "}
            Bạn nên đến khoa <strong>{localStorage.getItem("Khoa")}</strong> của
            chúng tôi để được hỗ trợ
          </div>
        </div>
      </div>
    </div>
  );
}
