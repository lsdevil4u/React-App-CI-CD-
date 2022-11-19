import { useState } from 'react'
import './Rating.scss';
import * as BsIcons from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { reviewRating } from '../../../Constant/Strings';
import PrimaryButton from '../Button/PrimaryButton';
import { reviewSuccess, reviewsuccessMessage } from '../../../Constant/Strings';
import { CrossIcon } from '../../../Constant/Images';
import { verticalDots } from './../../../Constant/Images';

const Rating = () => {
    const [review, setReview] = useState(false);
    const [ratingReview, setRatingReview] = useState(null);
    const [hover, setHover] = useState(null);
    const [reviewSuc, setReviewSuc] = useState(false);
    const [toggleAction, setToggleAction] = useState(false);

    const publishReview = () => {
        setReview(!review)
    }
    const reviewMessageSuccess = () => {
        setReviewSuc(!reviewSuc)
    }
    const actionDropdown = () => {
        setToggleAction(!toggleAction);
    }

    return (
        <div className='Rating-container'>
            <div className='ratings-container'>
                <div className='rate-stars'>
                    <div className='rating'>4.6</div>
                    <div>
                        <span className='fa fa-star checked'></span>
                        <span className='fa fa-star checked'></span>
                        <span className='fa fa-star checked'></span>
                        <span className='fa fa-star checked'></span>
                        <span className='half-star'><i className="fa fa-star-half"></i></span>
                    </div>
                </div>

                <div className='progress-container'>
                    <div className='container'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{ width: '90%' }}>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '70%' }}>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '5%' }}>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='star-container'>
                    <div className='start-ratings'>
                        <span className="fa fa-star checked "></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                    </div>
                    <div className='start-ratings'>
                        <span className="fa fa-star checked "></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                    </div>
                    <div className='start-ratings'>
                        <span className="fa fa-star checked "></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                    </div>
                    <div className='start-ratings'>
                        <span className="fa fa-star checked "></span>
                        <span className="fa fa-star checked"></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                    </div>
                    <div className='start-ratings'>
                        <span className="fa fa-star checked"></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                        <span style={{ fontSize: '1.12rem', marginRight: '.3rem' }}><BsIcons.BsStar /></span>
                    </div>
                </div>

                <div className='star-percent'>
                    <div>75%</div>
                    <div>65%</div>
                    <div>15%</div>
                    <div>10%</div>
                    <div>7%</div>
                </div>

            </div>

            <div>
                {!review && (
                    <button className='review-btn' onClick={() => setReview(true)}>Write a Review</button>
                )}
                <div className='review-rating'>
                    {review && (
                        <>
                            <div className='heading'>{reviewRating}</div>
                            <div>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type='radio'
                                                name='ratingReview'
                                                value={ratingValue}
                                                onClick={() => setRatingReview(ratingValue)}
                                            />
                                            <BsIcons.BsFillStarFill
                                                className='stars'
                                                color={ratingValue <= (hover || ratingReview) ? '#FFB800' : '#D9D9D9'}
                                                size={40}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    )

                                })}
                            </div>
                            <div className='review-inBox'>
                                <textarea
                                    rows={4}
                                    cols={30}
                                    type="text"
                                    className='review-input'
                                    placeholder='Write your review here...'
                                />
                                <div className='review-actions'>
                                    <button className='cancel-btn' onClick={() => setReview(!review)}>Cancel</button>
                                    <PrimaryButton message='Publish' className='publish' onPrimaryClick={() => { publishReview(); setReviewSuc(true) }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {reviewSuc && (
                    <div className='success-section'>
                        <img src='../../../Assests/Gifs/SuccessQA.gif' className='success-qa' />
                        <div>
                            <div className='success-gif'>
                                <div className='question-success-message'>{reviewSuccess}</div>
                                <div className='cancel-btn' onClick={reviewMessageSuccess}>{CrossIcon}</div>
                            </div>
                            <div className='SuccessMessage'>{reviewsuccessMessage}</div>
                        </div>
                    </div>
                )}


                <div className='review-section-part'>
                    <div className='user-name-icon'>SS</div>
                    <div className='review-part'>
                        <div className='review-header'>
                            <div className='reviewgiven-user'>Sanya Singh <span>23rd June ,2022</span></div>
                            <div className='dots' onClick={actionDropdown}>{verticalDots}</div>
                        </div>
                        {toggleAction && (
                            <div className='actionDropdown'>
                                <div onClick={() => setToggleAction(!toggleAction)}>Delete</div>
                                <div onClick={() => setToggleAction(!toggleAction)}>Edit</div>
                            </div>
                        )}
                        <div>
                            {[...Array(5)].map((rating, index) => {
                                return (
                                    <span className='fa fa-star checked' key={index}></span>
                                )
                            })}
                        </div>
                        <div className='user-review'>Very Nice workshop . Enjoyed learning new things</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rating