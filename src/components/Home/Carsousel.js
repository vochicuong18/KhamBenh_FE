import React,{ Component} from 'react';
class Carsousel extends Component {
    render () {
        return (
            <div>
              
                <div id="carouselId" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselId" data-slide-to="1"></li>
                        <li data-target="#carouselId" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img src='https://cdn.pixabay.com/photo/2014/12/10/20/56/medical-563427_960_720.jpg' alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src='https://news-tunisia.tunisienumerique.com/wp-content/uploads/2020/10/annulation_de_la_greve_des_collecteurs_du_lait_1603740119-1.jpg' alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src='https://cdn.wallpapersafari.com/34/41/WG4Hvm.jpg' alt="Third slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );

    }
}
export default Carsousel
