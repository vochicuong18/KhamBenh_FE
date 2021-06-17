import React, { Component } from "react";
import Image from "react-bootstrap/Image";

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="map__desktop" data-aos="fade-up">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.856369942478!2d106.68526211474446!3d10.822301761304722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1614670424213!5m2!1svi!2s"
          />
        </div>
        <footer className="footer">
          <div className="l-footer">
            <Image
              src="https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/logo12.png"
              style={{
                width: "350px",
                objectFit: "cover",
                marginLeft: "-10px",
                marginTop: "-10px",
              }}
            />
            <p>
              <br />
              Chúng tôi mang đến cho bạn một sự trải nghiệm khám bệnh tại nhà
              với phương châm chính xác, nhanh chóng và tiện lợi. Hy vọng rằng
              bạn sẽ hài lòng và yêu thích dịch vụ của chúng tôi
            </p>
          </div>
          <ul className="r-footer">
            <li>
              <h2>Social</h2>
              <ul className="box">
                <li>
                  <a href="https://www.facebook.com/dfgdfgert">Trần Ngọc Long</a>
                </li>
                <li>
                  <a href="https://www.facebook.com/vochicuong18/">Võ Chí Cường</a>
                </li>
                <li>
                  <a href="http://fit.iuh.edu.vn/">FIT IUH</a>
                </li>
              </ul>
            </li>

            <li>
              <h2>Liện hệ với chúng tôi</h2>
              <div className="l-footer">
                
                  Hotline sức khỏe
                  
                    Bạn có thắc mắc về bệnh cần tư vấn, hãy liên hệ với chúng
                    tôi để được giải pháp
                
                  <h5>0929.071.711</h5>
                
              </div>
            </li>
          </ul>
          <div className="b-footer">
            <p>All rights reserved by ©LCHEALTH 2021 </p>
          </div>
          <div className="hotline-phone-ring-wrap">
            <div className="hotline-phone-ring">
              <div className="hotline-phone-ring-circle" />
              <div className="hotline-phone-ring-circle-fill" />
              <div className="hotline-phone-ring-img-circle">
                <a href="tel:0929.071.711" className="pps-btn-img">
                  <img
                    src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png"
                    alt="Gọi điện thoại"
                    width={50}
                  />
                </a>
              </div>
            </div>
            <div className="hotline-bar">
              <a href="tel:0929.071.711">
                <span className="text-hotline">0929.071.711</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
