"use client";

import { useState } from 'react';

export default function CourseTabsWrapper() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <>
            <div className="course_1r2 mt-4 rounded-top bg-light">
                <ul className="nav nav-tabs mb-0">
                    <li className="nav-item d-inline-block me-2">
                        <button onClick={() => setActiveTab('home')} className={`nav-link border-0 ${activeTab === 'home' ? 'active' : ''}`}>
                            Overview
                        </button>
                    </li>
                    <li className="nav-item d-inline-block me-2">
                        <button onClick={() => setActiveTab('profile')} className={`nav-link border-0 ${activeTab === 'profile' ? 'active' : ''}`}>
                            Curriculum
                        </button>
                    </li>
                    <li className="nav-item d-inline-block me-2">
                        <button onClick={() => setActiveTab('profile1')} className={`nav-link border-0 ${activeTab === 'profile1' ? 'active' : ''}`}>
                            Instructor
                        </button>
                    </li>
                    <li className="nav-item d-inline-block me-2">
                        <button onClick={() => setActiveTab('profile2')} className={`nav-link border-0 ${activeTab === 'profile2' ? 'active' : ''}`}>
                            Reviews
                        </button>
                    </li>
                </ul>
            </div>
            <div className="course_1d3 p-4 bg-light">
                <div className="tab-content">
                    {activeTab === 'home' && (
                        <div className="tab-pane active">
                            <div className="home_i">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p>roin et eros varius, ornare turpis ac, dapibus nisi. Morbi luctus arcu non massa consequat, et tristique velit semper. Curabitur interdum vulputate sagittis. Donec erat massa, tincidunt sed feugiat id, suscipit in est. Proin laoreet orci quis augue eleifend varius. Donec hendrerit ex ut lacus blandit euismod.</p>
                                <div className="home_i1 row">
                                    <div className="col-md-4 mb-2">
                                        <div className="home_i1l">
                                            <h6 className="mb-0 text-uppercase"><a className="button_1 d-block text-center" href="/consultation">Enroll Now <i className="fa fa-chevron-right ms-1"></i></a></h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <div className="home_i1l">
                                            <h6 className="mb-0 text-uppercase"><a className="button d-block text-center" href="/consultation">GET MEMBERSHIP </a></h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="home_i1l mt-1">
                                            <ul className="social-network social-circle mb-0 p-0" style={{ listStyle: 'none' }}>
                                                <li className="d-inline-block mx-1"><a href="#" className="icoRss bg_green" title="Rss"><i className="fa fa-skype"></i></a></li>
                                                <li className="d-inline-block mx-1"><a href="#" className="icoFacebook bg_blue" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                                                <li className="d-inline-block mx-1"><a href="#" className="icoGoogle bg_oran" title="Google +"><i className="fa fa-pinterest"></i></a></li>
                                                <li className="d-inline-block mx-1"><a href="#" className="icoLinkedin bg-dark" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'profile' && (
                        <div className="tab-pane active">
                            <div className="profile_i">
                                <h4 className="mb-3">Starting With Educto</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore</p>
                                <div className="profile_i1 bg-white p-4">
                                    <p>Lesson1: Introduction Of Programming language ? <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">01 Hour</span></p><hr />
                                    <p>Lesson2: Installation and Set-Up Guide ? <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">02 Hour</span></p><hr />
                                    <p>Lesson3: Working with String, Boolean Functions ? <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">03 Hour</span></p><hr />
                                    <p>Lesson4: Working on Form Controls ? <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">04 Hour</span></p><hr />
                                    <p>Lesson5: Error Solutions and code debugging ? <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">05 Hour</span></p><hr />
                                    <p>Lesson6: Working with live site. <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">03 Hour</span></p><hr />
                                    <p className="mb-0">Module Handling <span className="bg_oran pt-2 pb-2 px-3 text-white d-inline-block float-end lh-1">40 Min</span></p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'profile1' && (
                        <div className="tab-pane active">
                            <div className="profile_1i text-center">
                                <div className="team_1i clearfix position-relative">
                                    <div className="team_1i1 clearfix text-center">
                                        <img src="/img/student_1.png" alt="Instructor" className="rounded-circle" style={{ width: '150px' }} />
                                    </div>
                                    <div className="team_1i2 position-absolute w-50 text-center p-3 bg-white rounded-3 shadow" style={{ left: '25%', bottom: '-30px' }}>
                                        <h5 className="text-uppercase"><a href="#">Eget Porta</a></h5>
                                        <h6 className="text-uppercase">Teacher</h6>
                                        <ul className="mb-0 p-0" style={{ listStyle: 'none' }}>
                                            <li className="font_14 d-inline-block mx-1"><a className="col_oran" href="#"><i className="fa fa-twitter me-1"></i></a></li>
                                            <li className="font_14 d-inline-block mx-1"><a className="col_oran" href="#"><i className="fa fa-instagram me-1"></i></a></li>
                                            <li className="font_14 d-inline-block mx-1"><a className="col_oran" href="#"><i className="fa fa-linkedin me-1"></i></a></li>
                                            <li className="font_14 d-inline-block mx-1"><a className="col_oran" href="#"><i className="fa fa-pinterest me-1"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="profile_1i1 mt-5 pt-3">
                                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..</p>
                                    <ul className="social-network social-circle mb-0 mt-3 p-0" style={{ listStyle: 'none' }}>
                                        <li className="d-inline-block mx-1"><a href="#" className="icoRss bg_green" title="Rss"><i className="fa fa-skype"></i></a></li>
                                        <li className="d-inline-block mx-1"><a href="#" className="icoFacebook bg_blue" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                                        <li className="d-inline-block mx-1"><a href="#" className="icoGoogle bg_oran" title="Google +"><i className="fa fa-pinterest"></i></a></li>
                                        <li className="d-inline-block mx-1"><a href="#" className="icoLinkedin bg-dark" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'profile2' && (
                        <div className="tab-pane active">
                            <div className="profile2i">
                                <h4 className="mb-4">Reviews (03)</h4>
                                {[
                                    { img: "/img/student_1.png", name: "Eget Porta" },
                                    { img: "/img/student_2.png", name: "Nulla Quis" },
                                    { img: "/img/student_3.png", name: "Lorem Amet" }
                                ].map((review, i) => (
                                    <div key={i}>
                                        <div className="profile2i1 row mx-0 align-items-center">
                                            <div className="col-md-2 col-4">
                                                <div className="profile2i1l">
                                                    <img src={review.img} alt="abc" className="rounded-circle w-100" />
                                                </div>
                                            </div>
                                            <div className="col-md-10 col-8">
                                                <div className="profile2i1r">
                                                    <h5 className="mb-1">{review.name}</h5>
                                                    <span className="col_oran">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </span>
                                                    <p className="mb-0 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde et culpa voluptatibus repellat voluptates aliquid minima</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                <h4 className="mb-4 mt-4">Add A Review</h4>
                                <div className="profile2i2 row mt-4">
                                    <div className="col-md-4 mb-3">
                                        <div className="profile2i2l">
                                            <input placeholder="Full Name" className="form-control rounded-3" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="profile2i2l">
                                            <input placeholder="Email Address" className="form-control rounded-3" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="profile2i2l pt-2">
                                            <h6>Your Rating : <span className="col_oran">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </span></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile2i2 row mt-3">
                                    <div className="col-md-12">
                                        <div className="profile2i2l">
                                            <textarea placeholder="Type Here Message" className="form-control rounded-3 form_text" style={{ minHeight: '150px' }}></textarea>
                                            <h6 className="mb-0 text-uppercase mt-3"><a className="button rounded-3" href="/consultation">Submit Review </a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
