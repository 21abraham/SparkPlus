import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide, Navigation, Pagination } from 'swiper/react';
import './Carousel.css';
export default function Home() {
    const [reviews, setReviews] = useState([]);
    const loadReviews = async () => {
        
        try {
            const result = await axios.get(`http://localhost:8081/reviews`);
            setReviews(result.data);
        } catch (error) {
            console.error(error);
        }
    };
    function renderStars(rating) {
        const maxStars = 5;
        const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest 0.5
        const starArray = Array.from({ length: maxStars }, (_, index) => {
            if (index < Math.floor(roundedRating)) {
                return <i key={index} className="fa fa-star" style={{ color: 'gold' }}></i>;
            } else if (
                index === Math.floor(roundedRating) &&
                roundedRating % 1 !== 0
            ) {
                return (
                    <i
                        key={index}
                        className="fa fa-star-half-o"
                        style={{ color: 'gold' }}
                    ></i>
                );
            } else {
                return <i key={index} className="fa fa-star-o" style={{ color: 'gold' }}></i>;
            }
        });
        return starArray;
    }




        function myFunction(id) {
            var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
            } else {
            x.className = x.className.replace(" w3-show", "");
            }
        }
    useEffect(() => {
        loadReviews();
    }, []);
    return (
        <div>
            <div className="w3-bar w3-white w3-large w3-top" style={{zIndex: 999} }>
                <a href="#home" className="w3-bar-item w3-button w3-aqua w3-mobile">
                    <i className="fa fa-bed w3-margin-right"></i>SPARK+
                </a>
                <a href="#h" className="w3-bar-item w3-button w3-mobile">
                    Locations
                </a>
                <a href="#r" to="/about" className="w3-bar-item w3-button w3-mobile">
                    About
                </a>
                <Link to="/adduser" className="w3-bar-item w3-button w3-mobile">
                    Register
                </Link>
                <Link to="/login" className="w3-bar-item w3-button w3-right w3-light-green w3-mobile">
                    Login
                </Link>
            </div>
            <header id="home" className="w3-display-container w3-content" style={{ maxWidth: '1500px' }}>
                <img
                    className="w3-image"
                    src="https://wallpapercave.com/wp/wp12082329.jpg"
                    alt="The Hotel"
                    style={{ minWidth: '1000px' }}
                    width="1500"
                    height="800"
                />
                
                <div className="w3-display-left w3-padding w3-col l6 m8" >
                    <div style={{ boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1)' }}>
                    <div className="w3-container w3-aqua">
                        <h2>
                            <i className="fa fa-bed w3-margin-right"></i>SPARK+
                        </h2>
                    </div>
                    <div className="w3-container w3-white w3-padding-16">
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div className="carousel-inner" >
                                <div className="carousel-item active" data-bs-interval="2000">
                                    <img src="https://www.lux-review.com/wp-content/uploads/2019/09/turkish-hotel.jpg" className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block" style={{ color: 'white' }}>
                                        <h5>Discover the art of hospitality. Find your perfect stay with us.</h5>
                                        <p>Unlock extraordinary experiences. Explore hotels that redefine luxury.</p>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="https://media.cntraveler.com/photos/6328cfee9ae3f06709fbdfcf/16:9/w_1920,h_1080,c_limit/Four%20Seasons%20Bali%20at%20Sayan_UBU_632.jpg" className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block" style={{ color: 'white' }}>
                                        <h5>Embark on a journey of comfort and style. Book your dream hotel today.</h5>
                                        <p>Indulge in the allure of exquisite accommodations. Your ideal hotel awaits.</p>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="3000">
                                    <img src="https://www.zastavki.com/pictures/1920x1080/2012/Interior_Super_Hotel_Room_035130_.jpg" className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block" style={{ color: 'white' }}>
                                        <h5>Unwind in elegance and sophistication. Discover the finest hotels worldwide.</h5>
                                        <p>Escape to paradise. Find tranquility and luxury in our handpicked hotels.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
            <div className="w3-content" style={{ maxWidth: '1532px' }}>
                <div className="w3-container w3-margin-top" id="rooms">
                    <h3 id="r">Rooms</h3>
                    <p>Make yourself at home is our slogan. We offer the best beds in the industry. Sleep well and rest well.</p>
                </div>

                <div className="w3-row-padding w3-padding-16">
                    <div className="w3-third w3-margin-bottom">
                        <img src="https://image-tc.galaxy.tf/wijpeg-83d7xnjo8o9sldji0rlvfxygg/single-garden_wide.jpg?crop=0%2C100%2C1920%2C1080" alt="Norway" style={{ width: '100%' }} />
                        <div className="w3-container w3-white">
                            <h3>Single Room</h3>
                            <h6 className="w3-opacity">From $99</h6>
                            <p>Single bed</p>
                            <p>15m<sup>2</sup></p>
                            <p className="w3-large">
                                <i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i>
                            </p>
                        </div>
                    </div>
                    <div className="w3-third w3-margin-bottom">
                        <img src="https://image-tc.galaxy.tf/wijpeg-aw11ddilxjf45jj1r5aaw33gr/guest-double-room-rhg-room-5-022-marked_wide.jpg?crop=0%2C38%2C1920%2C1080&width=1920" alt="Norway" style={{ width: '100%' }} />
                        <div className="w3-container w3-white">
                            <h3>Double Room</h3>
                            <h6 className="w3-opacity">From $149</h6>
                            <p>Queen-size bed</p>
                            <p>25m<sup>2</sup></p>
                            <p className="w3-large">
                                <i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i>{' '}
                                <i className="fa fa-tv"></i>
                            </p>
                        </div>
                    </div>
                    <div className="w3-third w3-margin-bottom">
                        <img src="https://wallpapers.com/images/hd/luxury-double-bed-hotel-room-nemacolin-18fapx30qeh0akn2.jpg" alt="Norway" style={{ width: '100%' }} />
                        <div className="w3-container w3-white">
                            <h3>Deluxe Room</h3>
                            <h6 className="w3-opacity">From $199</h6>
                            <p>King-size bed</p>
                            <p>40m<sup>2</sup></p>
                            <p className="w3-large">
                                <i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i>{' '}
                                <i className="fa fa-tv"></i> <i className="fa fa-glass"></i> <i className="fa fa-cutlery"></i>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding" id="about">
                    <div className="w3-col l4 12">
                        <h3>About</h3>
                        <h6>
                            Welcome to Spark+, your trusted companion in finding the perfect accommodations for your travels. We understand the importance of finding the right hotel that matches your preferences, budget, and travel needs. Whether you're planning a business trip, family vacation, or romantic getaway, Spark+ is here to help you discover exceptional hotels worldwide.

                            At Spark+, we strive to provide a seamless and user-friendly experience. Our mission is to make the process of finding and booking hotels convenient, reliable, and enjoyable for every traveler. With our extensive database of hotels, comprehensive search filters, and unbiased reviews, you can make informed decisions and find the ideal hotel that meets your expectations.
                        </h6>
                        <p>
                            We accept:{' '}
                            <i className="fa fa-credit-card w3-large"></i> <i className="fa fa-cc-mastercard w3-large"></i>{' '}
                            <i className="fa fa-cc-amex w3-large"></i> <i className="fa fa-cc-cc-visa w3-large"></i>
                            <i className="fa fa-cc-paypal w3-large"></i>
                        </p>
                    </div>
                    <div className="w3-col l8 12">
                        <img src="https://wallpaperaccess.com/full/1079101.jpg" className="w3-image w3-greyscale" style={{ width: '100%' }} />
                    </div>
                </div>

                <div className="w3-row-padding w3-large w3-center" style={{ margin: '32px 0' }}>
                    <div className="w3-third">
                        <i className="fa fa-map-marker w3-text-aqua"></i> Pune, Maharashtra, India
                    </div>
                    <div className="w3-third">
                        <i className="fa fa-phone w3-text-aqua"></i> Phone: +91 9022183798
                    </div>
                    <div className="w3-third">
                        <i className="fa fa-envelope w3-text-aqua"></i> Email: admin@gmail.com
                    </div>
                </div>

                <div className="w3-panel w3-purple w3-leftbar w3-padding-32">
                    <h6>
                        <i className="fa fa-info w3-aqua w3-padding w3-margin-right"></i> On demand, we can offer playstation,
                        baby and children care, dog equipment, etc.
                    </h6>
                </div>

                <div className="w3-container">
                    <h3 id="h">Login for Booking</h3>
                    <h6>You can find best hotels anywhere in the world:</h6>
                </div>

                <div className="w3-row-padding w3-padding-16 w3-text-white w3-large">
                    <div className="w3-half w3-margin-bottom">
                        <div className="w3-display-container w3-opacity w3-hover-opacity-off">
                            <img src="https://images6.alphacoders.com/677/677982.jpg" alt="Cinque Terre" style={{ width: '100%' }} />
                            <span className="w3-display-bottomleft w3-padding">Cinque Terre</span>
                        </div>
                    </div>
                    <div className="w3-half">
                        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                            <div className="w3-half w3-margin-bottom">
                                <div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://wallpaperaccess.com/full/123346.jpg" alt="New York" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">New York</span>
                                </div>
                            </div>
                            <div className="w3-half w3-margin-bottom">
                                <div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://images.hdqwalls.com/download/san-francisco-california-cityscape-4k-qv-1920x1080.jpg" alt="San Francisco" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">San Francisco</span>
                                </div>
                            </div>
                        </div>
                        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                            <div onClick={() => myFunction('pisa')} className="w3-half w3-margin-bottom">
                                <div className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://cdn.wallpapersafari.com/76/33/v0Ho56.jpg" alt="Pisa" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">Pisa</span>
                                </div>
                            </div>
                            <div className="w3-half w3-margin-bottom">
                                <div onClick={() => myFunction('paris')} className="w3-display-container w3-opacity w3-hover-opacity-off">
                                    <img src="https://wallpapers.com/images/featured/paris-zy4x2ow5p7j5qi4a.jpg" alt="Paris" style={{ width: '100%' }} />
                                    <span className="w3-display-bottomleft w3-padding">Paris</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="paris" className="w3-hide w3-padding-16 w3-center">
                    <div className="w3-container w3-center">
                        <h2>Ritz Paris</h2>
                        <img
                            src="https://www.completefrance.com/wp-content/uploads/2022/04/ritz-paris-grand-jardin.jpg"
                            alt="lights"
                            style={{ width: '50%', height: 'auto' }}
                        />
                        <p className="w3-padding-16 w3-center">
                            The Ritz Hotel is a luxurious and renowned hotel known for its elegance and exceptional service. Located in prime locations around the world, the Ritz Hotel offers a prestigious and upscale experience for its guests.</p>
                    </div>
                    <div className="w3-row-padding">
                        <div className="w3-col l4">
                            <img
                                src="https://passport-cdn.kiwicollection.com/blog/drive/uploads/2021/03/005276-01-The-MURAKA-Underwater-Villa-1.jpg"
                                alt="lights"
                                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            />
                            <p className="w3-padding-16 w3-center">
                                The room boasts a plush and comfortable bed, typically adorned with premium linens, soft pillows, and a cozy duvet, ensuring a restful night's sleep.
                             </p>
                        </div>
                        <div className="w3-col l4">
                            <img
                                src="https://media.tatler.com/photos/62277dea8d24fa6ec4247cbf/16:9/w_2560%2Cc_limit/SuiteWindsorVincentLeroux2-production_digital.jpg"
                                alt="nature"
                                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            />
                            <p className="w3-padding-16 w3-center">
                                The room is equipped with modern amenities to enhance the guest experience. This may include a flat-screen TV, a minibar, a coffee maker, and a safe for securing valuables.
                            </p>
                        </div>
                        <div className="w3-col l4">
                            <img
                                src="https://www.harpersbazaararabia.com/cloud/2021/09/10/lead_1-7.jpg"
                                alt="snowtops"
                                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            />
                            <p className="w3-padding-16 w3-center">
                                Guests staying in the bedroom at the Ritz Hotel can expect exceptional services, including 24-hour room service, daily housekeeping, and a dedicated concierge to assist with any requests or reservations.
                            </p>
                        </div>
                    </div>
                </div>
                <div id="pisa" className="w3-hide w3-padding-16 w3-center">
                    <div className="w3-container w3-center">
                        <h2>Palazzo Cini</h2>
                        <img
                            src="https://palazzo-cini-luxury-rooms-in-pisa.hotelmix.co.uk/data/Photos/OriginalPhoto/8227/822795/822795227/Palazzo-Cini-Luxury-Rooms-In-Pisa-Exterior.JPEG"
                            alt="lights"
                            style={{ width: '50%', height: 'auto' }}
                        />
                        <p className="w3-padding-16 w3-center">
                            Palazzo Cini Hotel welcomes guests with its exquisite architecture and refined interior design. The hotel is housed in a meticulously restored historic building, showcasing the grandeur of Italian Renaissance style. From the moment you step inside, you are immersed in a world of elegance and sophistication.</p>
                    </div>
                    <div className="w3-row-padding">
                        <div className="w3-col l4">
                            <img
                                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/230592401.jpg?k=d630aa075f06e7889bb2811030699f11d7fbcba4328dc3352998453f6dafcf73&o=&hp=1"
                                alt="lights"
                                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            />
                            <p className="w3-padding-16 w3-center">
                                Whether you are visiting Florence for leisure or business, Palazzo Cini Hotel offers a truly memorable experience. Immerse yourself in the timeless beauty of Florence while enjoying the exceptional service and comfort of this remarkable hotel.
                            </p>
                        </div>
                        <div className="w3-col l4">
                            <img
                                src="https://www.kayak.com/rimg/himg/c0/0f/46/hotelsdotcom-1060155072-cedc7927_w-368608.jpg?width=1366&height=768&xhint=1080&yhint=658&crop=true"
                                alt="nature"
                                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            />
                            <p className="w3-padding-16 w3-center">
                                The rooms and suites at Palazzo Cini Hotel are tastefully decorated, combining classic elements with contemporary comforts. Each accommodation is thoughtfully designed to provide a serene and relaxing atmosphere. Guests can expect luxurious furnishings, plush bedding, and modern amenities such as flat-screen TVs, minibars, and complimentary Wi-Fi.
                            </p>
                        </div>
                        <div className="w3-col l4">
                            <img
                                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/230592371.jpg?k=c1765bb9b1550a914b391eb53b7280246a68a6493e34421e9f8753197b10d545&o=&hp=1"
                                alt="snowtops"
                                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                            />
                            <p className="w3-padding-16 w3-center">
                                Located in the heart of Florence, Palazzo Cini Hotel provides easy access to the city's renowned attractions, including the Florence Cathedral, Uffizi Gallery, and Ponte Vecchio. The hotel's central location allows guests to explore the rich history, art, and culture of Florence, while also providing a peaceful retreat from the bustling city streets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Swiper
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                navigation={true}
                pagination={true}
            >
                {reviews.map(review => (
                    <SwiperSlide key={review.reviewId}>
                        <div className="review" style={{
                            padding: '20px 20px', margin: '100px 100px', boxShadow: '-1px 4px 28px 0px rgba(0,0,0,0.75)', backgroundImage: 'url("https://wallpapers.com/images/hd/blue-and-pink-background-5120-x-2880-pmgfthfg6b2e7zkj.jpg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                            <h3>
                                {review.user.username.charAt(0).toUpperCase() + review.user.username.slice(1)}</h3>
                            <img
                                src={review.hotel.hotelurl}
                                alt="lights"
                                style={{ width: '100%', height: 'auto', maxWidth: '350px', borderRadius: '25px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' }}
                            />
                            <h2>{review.hotel.hotelName}</h2>
                            <div style={{ fontSize: '20px' }}>{renderStars(review.rating)}</div>
                            <p style={{ fontSize: '20px' }}>{review.reviewText}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>*/}
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                navigation={{
                    prevEl: '.swiper-button-prev', // CSS selector for the previous button
                    nextEl: '.swiper-button-next'  // CSS selector for the next button
                }}
                pagination={{
                    el: '.swiper-pagination', // CSS selector for the pagination container
                    clickable: true
                }}
            >
                {reviews.map(review => (
                    <SwiperSlide key={review.reviewId}>
                        <div className="review" style={{
                            padding: '20px 20px',
                            margin: '100px 100px',
                            boxShadow: '-1px 4px 28px 0px rgba(0,0,0,0.75)',
                            backgroundImage: 'url("https://wallpapers.com/images/hd/blue-and-pink-background-5120-x-2880-pmgfthfg6b2e7zkj.jpg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                            <h3>
                                {review.user.username.charAt(0).toUpperCase() + review.user.username.slice(1)}</h3>
                            <img
                                src={review.hotel.hotelurl}
                                alt="lights"
                                style={{ width: '100%', height: 'auto', maxWidth: '350px', borderRadius: '25px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' }}
                            />
                            <h2>{review.hotel.hotelName}</h2>
                            <div style={{ fontSize: '20px' }}>{renderStars(review.rating)}</div>
                            <p style={{ fontSize: '20px' }}>{review.reviewText}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <footer className=" w3-black w3-center w3-margin-top">
                <div className="w3-aqua" style={{ textAlign: 'center', color: 'black', padding: '20px 0 20px 20px', fontSize: '20px' }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <b style={{ fontSize: '30px' }}>About Us:</b>
                            <br />
                            <ul className="list-unstyled">
                                <li>Computer department.</li>
                                <li>Abraham Ahmed</li>
                                <li>Ajinkya Khete</li>
                                <li>Kaustubh Bhavsar</li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <b style={{ fontSize: '30px' }}>Instructor:</b>
                            <br />
                            <p>Mr. Suresh Pal, Instructor of Super 30 Batch.</p>
                            <br />
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '20px', textAlign: 'center', backgroundColor: 'black' }}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="https://mitaoe.ac.in/" ><h>@MITAOE</h></Link>
                </div>
            </footer>
        </div>
  );
}
