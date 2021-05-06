import React,{ Component } from 'react';

class Footer extends Component {
  render () {  
    return (
      <div>
        <div className="map__desktop" data-aos="fade-up" >
          <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.856369942478!2d106.68526211474446!3d10.822301761304722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1614670424213!5m2!1svi!2s"/>
        </div> 
        <footer>
            <div className='box__footer'>
              <h4>PHÒNG KHÁM LCHealthy</h4>
              <p>Địa chỉ: 12, Nguyễn Văn Bảo, Phường 5, Gò Vấp, TP. Hồ Chí Minh</p>
              <p>Thời gian làm việc: 8:00 - 17:00</p>
              <p>Làm việc tất cả ngày lễ, Tết</p>
            </div>
            <div className="box__footer">
            </div>
            <div className="box__footer call">
              <h4>GỌI ĐIỆN TƯ VẤN</h4>
              Hotline sức khỏe
              <p>Bạn có thắc mắc về bệnh cần tư vấn, hãy liên hệ với chúng tôi để được giải pháp</p>
              <h4>0929.071.711</h4>
              Based on Jiohealth.com
            </div>
            <div className="hotline-phone-ring-wrap">
              <div className="hotline-phone-ring">
              <div className="hotline-phone-ring-circle" />
              <div className="hotline-phone-ring-circle-fill" />
              <div className="hotline-phone-ring-img-circle">
                  <a href="tel:0929.071.711" className="pps-btn-img">
                    <img src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png" alt="Gọi điện thoại" width={50} />
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
    )

  };
}

export default Footer;
