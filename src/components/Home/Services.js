import React,{ Component } from 'react';

class Services extends Component {
  render () {  
    return (
        <div>
            <img alt ='' className='img__services' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/images/as-seen-on-news-background.svg'></img>
            <div className="services" >
                <div className="services__title" data-aos="fade-up" >
                    <h2>Dịch vụ của chúng tôi </h2>
                    <div className='color__title' ></div>
                </div>
               
                <div className="services__item" data-aos="fade-up" >
                    <div className="itemsv csvc">
                        <img alt ='' src="https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/icon1m1.png" width="25%"></img>
                        <h5>Điều trị trong ngày</h5>
                        <p>Không cần nằm viện, tiết kiệm thời gian, giảm tối đa chi phí</p>
                        <button type="button" className="btn btn-light">Xem thêm</button>
                    </div>
                    <div  className="itemsv bs">
                        <img alt ='' src="https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/icon1m2.png" width='25%'></img>
                       <h5>Tư vấn miễn phí</h5>
                       <p>Giải đáp chính xác, tương tác dễ dàng và bảo mật thông tin cho bạn</p>
                       <button type="button" className="btn btn-light">Xem thêm</button>
                    </div>
                    <div  className="itemsv kt">
                        <img alt ='' src="https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/icon1m3.png" width='25%'></img>
                        <h5>Dịch vụ khám ngoài giờ</h5>
                        <p>Chủ động thời gian, quy trình nhanh chống, hiệu quả cao</p>
                        <button type="button" className="btn btn-light">Xem thêm</button>
                    </div>
                    <div  className="itemsv dv">
                        <img alt ='' src="https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/icon1m4.png" width='25%'></img>
                        <h5>Đặt lịch khám online</h5>
                        <p>Đặt lịch online nhận ưu đãi, tiết kiệm thời gian</p>
                        <button type="button" className="btn btn-light">Xem thêm</button>
                    </div>
                </div>
            </div>
            <div className="services__cause" data-aos="fade-up">
                <img alt ='' className='img__cause' src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/images/not-feeling-well.svg"/>
                <div className='cause__title'>                   
                    <h2>Vì sao nên chọn LCHealthy</h2>
                </div>
                <div className='color__title' ></div>
            <div className='services__card' >
                <div className='card__cause bs'>
                     <div className='bs__image'>
                        <img alt ='' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/experience.png'></img>
                     </div>
                     <div className='bs__content'>
                        <h5>Bác sĩ giỏi chuyên môn</h5>
                        <p>Đội ngũ danh y giỏi chuyên môn, có nhiều năm kinh nghiệm từng công tác tại các bệnh viện lớn</p>
                     </div>
                </div>
                <div className='card__cause nt'>
                    <div className='bs__image'>
                        <img alt ='' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/multilingual.png'></img>
                     </div>
                     <div>
                        <h5>Trình độ ngoại ngữ</h5>
                        <p>Các chuyên viên y tế của chúng tôi có thể trao đổi với bệnh nhân bằng nhiều ngôn ngữ như tiếng Anh, tiếng Pháp.</p>
                     </div>
                </div>
                <div className='card__cause tc'>
                    <div className='bs__image'>
                        <img alt ='' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/international.png'></img>
                     </div>
                    <div className='tc__content'>
                        <h5>Tiêu chuẩn quốc tế</h5>
                        <p>Phòng khám đáp ứng mọi tiêu chí về thiết kế, bố trí tổng thể dựa trên yêu cầu về tiêu chuẩn quốc tế</p>
                    </div>
                </div>
                <div className='card__cause prices'>
                    <div className='bs__image'>
                        <img alt ='' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/distinguished.png'></img>
                     </div>
                     <div>
                        <h5>Chi phí hợp lí</h5>
                        <p>100% chi phí của chúng tôi đều công khai minh bạch và được nhập hệ thống cẩn thận</p>
                     </div>                  
                </div>
                </div>
            </div>
        </div>
    )
  };
}

export default Services;
