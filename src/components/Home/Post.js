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
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://cms.jiohealth.com/content/images/2021/03/backache_1_900.png"></img>
                   <div className="item__swiper_desc">
                       <p>Những vấn đề đau lưng ở người trẻ</p>
                   </div>
                </div>        
            </SwiperSlide>
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://cms.jiohealth.com/content/images/2021/03/backache_1_900.png"></img>
                   <div className="item__swiper_desc">
                       <p>Những vấn đề đau lưng ở người trẻ</p>
                   </div>
                </div>        
            </SwiperSlide>
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://cms.jiohealth.com/content/images/2021/03/backache_1_900.png"></img>
                   <div className="item__swiper_desc">
                       <p>Những vấn đề đau lưng ở người trẻ</p>
                   </div>
                </div>        
            </SwiperSlide>
            <SwiperSlide>
                <div className="item__swiper">
                    <img alt ='' className="item__swiper__img" src="https://cms.jiohealth.com/content/images/2021/03/backache_1_900.png"></img>
                   <div className="item__swiper_desc">
                       <p>Những vấn đề đau lưng ở người trẻ</p>
                   </div>
                </div>        
            </SwiperSlide>
          </Swiper>
          </div>  
        )
    }
}
export default Post