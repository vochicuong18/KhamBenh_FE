import React,{ Component } from 'react';

class SerCal extends Component {
    render() {
        return(
          <div>
              <div className='sercal'>
                    <div className="img__call" data-aos="fade-up">
                        <img alt ='test' src="https://imagebucketkhambenhonl-1.s3.amazonaws.com/177319267_477913553452087_6411954198265280607_n.png85290205833576"/>
                    </div>                   
                    <div className='content' data-aos="fade-up">
                        <div>
                            <h2 className='title' >Tư vấn sức khỏe từ xa 24/7 qua video và chat</h2>
                            <div className='color__title' ></div>
                        </div>
                        <div className='text' >
                            Bạn cần sự tư vấn chuyên môn khi gặp các vấn đề sức khỏe? Dù bạn ở đâu hay vào bất cứ lúc nào, 
                            các bác sĩ chuyên khoa của chúng tôi luôn sẵn sàng tư vấn, giải đáp đáp mọi thắc mắc của bạn.
                        </div>
                        <div className="icon__sercal row">
                            <div className="icon__item col">
                                <img alt ='' className='sercalimg' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/video-icon.svg'/>                           
                                Video call với bác sĩ
                            </div>
                            <div  className="icon__item col">
                                <img alt ='' className='sercalimg' src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/chat-icon.svg'/>
                                Chat với bác sĩ
                            </div>

                            
                            
                        </div>
                          
                    </div>
              </div>
          </div>  
        );
    }
}
export default SerCal;