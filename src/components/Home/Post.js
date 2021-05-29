import React,{ Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

class Post extends Component {
    render() {
        return (
            <div className="post" data-aos="fade-up">
                <div className='post__title'>
                    <h2 className="title" >Bài viết y khoa nổi bật</h2>
                    <div className='color__title' ></div>
                </div>
            <Swiper className='wapper' 
            spaceBetween={60}
            slidesPerView={4}
            // navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}>
            <SwiperSlide className='test2'>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://znews-photo.zadn.vn/w860/Uploaded/qxjwpprjv/2021_05_26/DSC_0006_zing.jpg" height="250px" style={{objectFit:'cover'}}></img>
                   <div className="item__swiper_desc">
                       <p>Tình hình dịch COVID-19 căng thẳng ở TPHCM</p>
                   </div>
                </div>        
            </SwiperSlide>
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="http://thoibaotaichinhvietnam.vn/Pictures42021/hothudung-tbtc/113986619.jpg" height="250px" style={{objectFit:'cover'}}></img>
                   <div className="item__swiper_desc">
                       <p>Phố đi bộ Nguyễn Huệ vắng vẻ sau lệnh cấm tụ tập</p>
                   </div>
                </div>        
            </SwiperSlide>
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://znews-photo.zadn.vn/w1920/Uploaded/zugttw/2021_05_28/188953586_10158424952763789_4238621842696441834_n.jpg" height="250px" style={{objectFit:'cover'}}></img>
                   <div className="item__swiper_desc">
                       <p>Thiết lập thêm 3 bệnh viện dã chiến tại Bắc Giang</p>
                   </div>
                </div>        
            </SwiperSlide>
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://znews-photo.zadn.vn/w860/Uploaded/znanug/2021_05_17/22_1.JPG" height="250px" style={{objectFit:'cover'}}></img>
                   <div className="item__swiper_desc">
                       <p>Những người được test nhanh nCoV hàng tuần</p>
                   </div>
                </div>        
            </SwiperSlide>
          </Swiper>
          </div>  
        )
    }
}
export default Post