import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import './CreateWorkshop.scss'
import { BackChev, WhiteTick } from './../../Shared/Svg/Svg';
import Footer from '../../Shared/Footer/Footer';
import { Header } from '../../Shared/Header';
import InputText from '../../Shared/InputText/InputText';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import { Createworkshop, FillTheForm } from "../../../Constant/Strings"
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CreateWebinar } from './../../../Redux/Actions/WorkShop';
import Moment from 'moment';
import ResponseModals from '../../Shared/Screens/ResponseModals/ResponseModals';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateTimeCalender } from '../../../Constant/Images';
import Loader from './../../Shared/Loader/Loader';
import ImageCropModal from '../../Shared/ImageCropModal/ImageCropModal';
import 'react-image-crop/src/ReactCrop.scss';

const CreateWorkshop = () => {
    const dispatch = useDispatch()
    const createWorkshp = useSelector((state) => state?.CreateWorkshop?.isLoadingPending, shallowEqual);
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);


    const [workShopForm, setWorkShopform] = useState({
        webinar_title: '',
        cover_image: '',
        price: '',
        start_date: Moment(new Date()).format('YYYY-MM-DD h:mm aa'),
        end_date: Moment(new Date()).format('YYYY-MM-DD h:mm aa'),
        duration: '30_min',
        description: '',
        what_you_will_learn: '',
        requirement: '',
        rewards: '',
    })



    const handleRegForm = (event) => {
        const { name, value, type, checked } = event.target
        setWorkShopform(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    const [cover_image, setcover_image] = useState()
    const [src, selectFile] = useState(null)

    const selectcover_image = (e) => {
        selectFile(URL.createObjectURL(e.target.files[0]))
        var contentFile = e.target.files[0]
        const reader = new FileReader();
        reader.addEventListener('load', () => { setcover_image(reader.result) });
        reader.readAsDataURL(contentFile);
    }
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });



    const [pages, setPages] = useState(1)
    const [response, setResponse] = useState('')
    const [namevalidation, setNamevalidation] = useState(false);
    const [endDateValidate, setEndDateValidate] = useState(false);
    const [price, setPrice] = useState(false);



    const handleSubmit = (event) => {
        event.preventDefault()

        if (pages === 1 && (!workShopForm.webinar_title?.length > 0)) { setNamevalidation(true); return; } else { setNamevalidation(false) };
        if (pages === 1 && (workShopForm.webinar_title?.length > 2 && cover_image !== undefined)) {

            setPages(prevValue => prevValue + 1)
            setWorkShopform(prevData => {
                return {
                    ...prevData,
                    cover_image,
                    start_date: startDate,
                    end_date: endDate,
                }

            })
        }
        // if (pages === 2 && (endDate > startDate)) { setEndDateValidate(true); return; } else { setEndDateValidate(false) };
        if (pages === 2 && !workShopForm.price?.length > 0) { setPrice(true); return; } else { setPrice(false) };

        if (pages === 2 && workShopForm.price?.length > 0) {
            setPages(prevValue => prevValue + 1)

        }
        // if (pages >= 2) {
        //     setPages(3)
        // }
        if (pages === 3) {
            setPages(prevValue => prevValue + 1)
        }
        // if (pages > 3) {
        //     setPages(4)
        // }
        if (pages === 3) {
            dispatch(CreateWebinar(workShopForm))
                .then(response => { setResponse(response) })
                .catch(response => setResponse(response))

        }
    }

    const checkForfields = () => { }
    const handleBackButton = () => {
        if (pages > 1) {
            setPages(prevValue => prevValue - 1)
        }
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const customDateTimeInput = (date) => {
        // var prevStartDate = Moment(workShopForm.start_date, "HH:mm");
        // var currentStartDate = Moment(date, "HH:mm");
        // var duration = currentStartDate.diff(prevStartDate, 'minutes');
        // if (duration !== 0){
        //     setStartDateOpen(false)
        // }
        setStartDate(date)
        let endDate = new Date(date.getTime() + 60 * 60000);
        setEndDate(endDate)
        setWorkShopform(prevData => {
            return {
                ...prevData,
                start_date: date,
                end_date: endDate,
            }
        })

    }
    const customEndDateTimeInput = (date) => {
        // setStartDate(date)
        setEndDate(date)
        setWorkShopform(prevData => {
            return {
                ...prevData,
                // start_date: startDate,
                end_date: date,
            }
        })

    }




    const ExampleCustomTimeInput = ({ date, value, onChange }) => (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ border: "solid 1px pink" }}
        />
    );

    return (
        <>
            {createWorkshp === true && <Loader />}

            <div className='createworkshop-page'>
                <Header />
                <div className=''>

                    <div className='registration-screen'>
                        <div className='text-side'>
                            <div className='registration-header'>{Createworkshop}</div>
                            <div className='sub-header'>{FillTheForm}</div>
                        </div>

                        <div className='form-side'>
                            {
                                (response.status === undefined)
                                    ?
                                    <div>
                                        <div className='d-flex justify-content-around'>

                                            <span className='progress-status'>
                                                <span className=''>
                                                    {
                                                        pages > 1
                                                            ?
                                                            <div className='progress-stages progress-stages-checked'>{WhiteTick}</div>
                                                            :
                                                            <div className='progress-stages'>1</div>
                                                    }
                                                </span>
                                                <span className=''>Basics</span>
                                            </span>

                                            <span className='progress-status'>
                                                <span>
                                                    {
                                                        pages > 2 ?
                                                            <div className='progress-stages progress-stages-checked'>{WhiteTick}</div>
                                                            :
                                                            <div className='progress-stages'>2</div>
                                                    }

                                                </span>
                                                <span>Details</span>
                                            </span>

                                            <span className='progress-status'>
                                                <span>
                                                    {
                                                        pages > 3 ?
                                                            <div className='progress-stages progress-stages-checked'>{WhiteTick}</div>
                                                            :
                                                            <div className='progress-stages'>3</div>
                                                    }
                                                </span>
                                                <span>Others</span>
                                            </span>

                                        </div>
                                        <hr />
                                        <div className='reg-form mb-3'>
                                            {(pages === 1)
                                                &&
                                                <div className='reg-form-basics'>
                                                    <div className=''>Workshop Name</div>
                                                    <InputText
                                                        placeholder='ex: Become a Developer in a month'
                                                        type="text"
                                                        className="input-box"
                                                        onChange={handleRegForm}
                                                        name="webinar_title"
                                                        value={workShopForm.webinar_title}

                                                    />
                                                    {(workShopForm.webinar_title?.length > 0 && workShopForm.webinar_title?.length < 3) && <span className='warnings'>Name can not be less than 3 characters</span>}

                                                    {namevalidation && (
                                                        (!workShopForm.webinar_title?.length > 0) && <span className='warnings'>This feild can not be empty</span>
                                                    )}

                                                    <div className='cover-text'>Cover Image <span>*</span></div>
                                                    <label htmlFor='workshopPage-upload-image' className='workshopPage-upload-image-substitute' >
                                                        {!cover_image && <img className='workshopPage-upload-image-placeholder' src='/Assests/Images/uploadIcon.png' />}
                                                        {cover_image && <img className='workshopPage-upload-image-substitute' src={cover_image} />}
                                                        <input
                                                            type='file'
                                                            accept='image/*'
                                                            onClick={(event) => {
                                                                event.target.value = null
                                                            }}
                                                            onChange={(e) => selectcover_image(e)}
                                                            className='workshopPage-upload-image'
                                                            id='workshopPage-upload-image'
                                                        />
                                                    </label>
                                                    {/* {(regForm.fullname?.length > 0 && !nameValidate.test(regForm.fullname)) && <span className='warnings'>Invalid Name</span>} */}
                                                </div>}

                                            {(pages === 2)
                                                &&
                                                <div className='reg-form-socials'>
                                                    <div className='cover-text'>Start Date and Time</div>
                                                    <label htmlFor='calender-workshop-calender' className='date-time-input' onClick={ () => setStartDateOpen(true)}>
                                                        <div className='dateTimeCalender'>
                                                            {dateTimeCalender}
                                                        </div>
                                                        <div className='mt-0'>

                                                            <DatePicker
                                                                selected={startDate}
                                                                minDate={new Date()}
                                                                // onChange={(date) => setStartDate(date)}
                                                                onChange={(date) => customDateTimeInput(date)}
                                                                className='calendar-datepicker input-bx'
                                                                timeInputLabel="Time:"
                                                                // open={startDateOpen}
                                                                // onClickOutside={()=> setStartDateOpen(false)}
                                                                // shouldCloseOnSelect
                                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                                calendarClassName="custom-calendar"
                                                                customTimeInput={<ExampleCustomTimeInput />}
                                                                showTimeSelect
                                                                timeClassName={() => "text-black"}
                                                            // shouldCloseOnSelect
                                                            />
                                                        </div>
                                                    </label>

                                                    {/* {(regForm.email?.length > 0 && !validEmail.test(regForm.email)) && <span className='warnings'>Invalid Email</span>} */}
                                                    <div className='cover-text'>End Date and Time</div>

                                                    <label htmlFor='calender-workshop-calender' className='date-time-input'>


                                                        <div className='dateTimeCalender'>
                                                            {dateTimeCalender}
                                                        </div>
                                                        <div className='mt-0'>
                                                            <DatePicker
                                                                selected={endDate}
                                                                minDate={new Date()}
                                                                // onChange={(date) => setEndDate(date)}
                                                                onChange={(date) => customEndDateTimeInput(date)}
                                                                className='calendar-datepicker input-bx'
                                                                timeInputLabel="Time:"
                                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                                calendarClassName="custom-calendar"
                                                                customTimeInput={<ExampleCustomTimeInput />}
                                                                showTimeSelect
                                                                timeClassName={() => "text-black"}
                                                            />
                                                        </div>
                                                    </label>

                                                    <div className=''>Entry Charge per User <span className='required-feild'>*</span></div>
                                                    <InputText
                                                        placeholder='In Rupees'
                                                        type="number"
                                                        className="input-box"
                                                        onChange={handleRegForm}
                                                        name="price"
                                                        value={workShopForm.price}
                                                    />
                                                    {(workShopForm.price?.length > 0 && workShopForm.price?.length < 1) && <span className='warnings'>Enter a valid price</span>}
                                                    {price &&
                                                        ((!workShopForm.price?.length > 0) && <span className='warnings'>Price can not be empty</span>
                                                        )}


                                                    <div className='cover-text'>Overview</div>
                                                    <textarea
                                                        placeholder='Type here'
                                                        className="reg-form-textarea"
                                                        autoComplete='on'
                                                        autoCorrect='on'
                                                        maxLength='500'
                                                        onChange={handleRegForm}
                                                        name="description"
                                                        value={workShopForm.description}
                                                    />


                                                </div>}

                                            {(pages === 3 || pages === 4)
                                                &&
                                                <div className='reg-form-others'>
                                                    <div className='cover-text'>What user will learn</div>
                                                    <textarea
                                                        placeholder='Type here'
                                                        className="reg-form-textarea"
                                                        autoComplete='on'
                                                        autoCorrect='on'
                                                        maxLength='500'
                                                        onChange={handleRegForm}
                                                        name="what_you_will_learn"
                                                        value={workShopForm.what_you_will_learn}
                                                    />
                                                    <div className='cover-text'>Requirements</div>
                                                    <textarea
                                                        placeholder='Type here'
                                                        className="reg-form-textarea"
                                                        autoComplete='on'
                                                        autoCorrect='on'
                                                        maxLength='500'
                                                        onChange={handleRegForm}
                                                        name="requirement"
                                                        value={workShopForm.requirement}
                                                    />
                                                    <div className='cover-text'>Rewards</div>
                                                    <textarea
                                                        placeholder='Type here'
                                                        className="reg-form-textarea"
                                                        autoComplete='on'
                                                        autoCorrect='on'
                                                        maxLength='500'
                                                        onChange={handleRegForm}
                                                        name="rewards"
                                                        value={workShopForm.rewards}
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <PrimaryButton
                                            message='Next'
                                            className='next-btn'
                                            onClick={checkForfields}
                                            backButton={pages > 1}
                                            onBackClick={handleBackButton}
                                            onPrimaryClick={handleSubmit}

                                        />
                                    </div>
                                    :
                                    <ResponseModals response={response} setResponse={setResponse} />

                            }
                        </div>
                    </div>
                    {src &&
                        <ReactCrop
                            onImageLoaded={setImage}
                            crop={crop}
                            onChange={setCrop}
                            src={src}

                        />
                    }

                </div>
                <Footer
                    className="regForm-footer"
                />
            </div >
        </>
    )
}

export default CreateWorkshop