import React, { useState } from 'react';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import Footer from '../../Shared/Footer/Footer';
import { Header } from '../../Shared/Header';
import InputText from '../../Shared/InputText/InputText';
import ResponseModals from '../../Shared/Screens/ResponseModals/ResponseModals';
import './CreateGatedContent.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { WhiteTick } from '../../Shared/Svg/Svg';
import { Creategatedcontent, FillformGated } from '../../../Constant/Strings';
import { priceValidate } from './../../Shared/Validators/Validators';
import { createGatedContent } from '../../../Redux/Actions/GatedContent';
import "react-datepicker/dist/react-datepicker.css";
import Loader from './../../Shared/Loader/Loader';

// const config = {
//     buttons: ['bold', 'italic']
// }

const CreateGatedContent = () => {
    const dispatch = useDispatch();
    const CreateGated = useSelector((state) => state?.CreateGatedContent, shallowEqual);

    // const [value, setValue] = useState('')



    const [gatedContentForm, setGatedContentForm] = useState({
        title: '',
        message: '',
        expiry_time: '',
        price: '',
        user: localStorage.getItem('current_user_id')
    })


    const handleRegForm = (event) => {
        const { name, value, type, checked } = event.target
        setGatedContentForm(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const [cover_image, setcover_image] = useState()
    const [exceedFileSize, setExceedFileSize] = useState(false)

    const [fileType, setFileType] = useState('')



    const selectcover_image = (e) => {


        const oneMegaByte = 100000
        e.target.files[0].size > oneMegaByte * 100 && setExceedFileSize(true)
        e.target.files[0].size < oneMegaByte * 100 && setExceedFileSize(false)
        var contentFile = e?.target?.files[0]
        const reader = new FileReader();
        // let fileType = '';





        if (e.target.files[0].size < oneMegaByte * 100) {
            reader.addEventListener('load', () => {
                let abc = ''
                if (reader?.result?.includes('data:audio')) {
                    setFileType('audio')
                    abc = 'audio'
                }
                if (reader?.result?.includes('data:image')) {
                    setFileType('image')
                    abc = 'image'
                }
                if (reader?.result?.includes('data:application')) {
                    setFileType('doc')
                    abc = 'doc'
                }
                if (reader?.result?.includes('data:video')) {
                    setFileType('video')
                    abc = 'video'
                }


                setcover_image(reader.result);
                setGatedContentForm(prevData => {
                    return {
                        ...prevData,
                        content: reader.result,
                        type_of_content: abc,
                    }
                })
            });
        }
        reader.readAsDataURL(contentFile);

    }


    const [pages, setPages] = useState(1)
    const [response, setResponse] = useState('')
    const [nameValidate, setNameValidate] = useState(false);
    const [price, setPrice] = useState(false);
    const [priceNeg, setPriceNeg] = useState(false);
    const [priceZero, setPriceZero] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault()


        if (pages === 1 && gatedContentForm.title?.length > 2) {
            setPages(prevValue => prevValue + 1)
        }

        if (pages >= 2) {
            setPages(2)
        }
        if (pages === 1 && (!gatedContentForm.title?.length > 0)) { setNameValidate(true); return; } else { setNameValidate(false) };
        if (pages === 2 && (!gatedContentForm.price?.length > 0)) { setPrice(true); return; } else { setPrice(false) };
        if (pages === 2 && (gatedContentForm.price?.length > 0 && !priceValidate.test(gatedContentForm.price))) { setPriceNeg(true); return; } else { setPriceNeg(false) };
        if (pages === 2 && gatedContentForm.price < 1) { setPriceZero(true); return; } else { setPriceZero(false) };
        if (pages === 2 && (gatedContentForm.title?.length > 2 && gatedContentForm.price !== '')) {
            dispatch(createGatedContent(gatedContentForm))
                .then(response => {
                    setResponse(response)
                })
                .catch(response => setResponse(response))
        }
    }

    const handleBackButton = () => {
        if (pages > 1) {
            setPages(prevValue => prevValue - 1)
        }
    }

    return (
        <>
            {CreateGated?.isLoadingPending && <Loader />}
            <div className='gated-content-create'>
                <div className='header'>
                    <Header />

                </div>
                <div className=''>

                    <div className='registration-screen'>
                        <div className='text-side'>
                            <div className='registration-header'>{Creategatedcontent}</div>
                            <div className='sub-header'>{FillformGated}</div>
                        </div>

                        <div className='form-side'>
                            {(response.status === undefined) ? <div>
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
                                        <span>Content</span>
                                    </span>


                                </div>
                                <hr />
                                <form className='reg-form mb-3' onSubmit={handleSubmit}>
                                    {(pages === 1)
                                        &&
                                        <div className='reg-form-basics'>
                                            <div className=''>Title for Gated Content *</div>
                                            <InputText
                                                placeholder='Title'
                                                type="text"
                                                className="input-box"
                                                onChange={handleRegForm}
                                                name="title"
                                                value={gatedContentForm.title}
                                            />
                                            {(gatedContentForm.title?.length > 0 && gatedContentForm.title?.length < 3) && <span className='warnings'>Invalid Name</span>}
                                            {nameValidate &&
                                                ((!gatedContentForm.title?.length > 0) && <span className='warnings'>Name can not be empty</span>
                                                )}

                                            <div className='mt-1'>Message</div>
                                            <textarea
                                                placeholder='Your hidden message goes here'
                                                className="reg-form-textarea"
                                                autoComplete='on'
                                                autoCorrect='on'
                                                style={{ height: "20rem" }}
                                                maxLength='500'
                                                onChange={handleRegForm}
                                                name="message"
                                                value={gatedContentForm.message}
                                            />
                                            {/* <RichTextEditor
                                                setValue={setValue}
                                                // value={gatedContentForm.message}
                                                config={config}
                                            />
                                            {value} */}

                                        </div>}

                                    {(pages === 2)
                                        &&
                                        <div className='reg-form-socials'>
                                            <div className='mb-3'>Select Upload Type <sub>(Image, Video or File)</sub> </div>

                                            {<label htmlFor='workshopPage-upload-image' className='workshopPage-upload-image-substitute'>
                                                {!cover_image && <img className='workshopPage-upload-image-placeholder' src='/Assests/Images/uploadIcon.png' />}
                                                {cover_image?.includes('application/pdf') && <div className='workshopPage-upload-image-substitute-pdf-holder'><img className='workshopPage-upload-image-substitute-pdf' src='/Assests/Images/dummyPdf.png' /></div>}
                                                {/* {cover_image?.includes('application/pdf') && <div className='workshopPage-upload-image-substitute-pdf-holder'><img className='workshopPage-upload-image-substitute-pdf' src='/Assests/Images/dummyPdf.png' /></div>} */}
                                                {cover_image?.includes('image') && <img className='workshopPage-upload-image-substitute' src={cover_image} />}
                                                {/* {cover_image?.includes('image/jpeg' || 'image/jpg' || 'image/png') && <img className='workshopPage-upload-image-substitute' src={cover_image} />} */}
                                                {cover_image?.includes('video/mp4' || 'video/m3u8') && <video controls height="150px" width="100%" src={cover_image} type="video/webm video/mp4">
                                                </video>}
                                                <input
                                                    type='file'
                                                    onClick={(event) => {
                                                        event.target.value = null
                                                    }}
                                                    onChange={selectcover_image}
                                                    className='workshopPage-upload-image'
                                                    id='workshopPage-upload-image'
                                                />

                                            </label>}
                                            {/* <span></span> */}

                                            {exceedFileSize && <span className='warnings'>File Size Too Big</span>}

                                            {/* <div className=''>Content Expiry Time</div>
                                            <InputText
                                                placeholder='Date/Month/Year - Hour:Mins'
                                                type="text"
                                                className="input-box"
                                                onChange={handleRegForm}
                                                name="expiry_time"
                                                value={gatedContentForm.expiry_time}
                                            /> */}
                                            <div className=''>Enter View Price *</div>
                                            <InputText
                                                placeholder='In Rupees'
                                                type="text"
                                                className="input-box"
                                                onChange={handleRegForm}
                                                name="price"
                                                value={gatedContentForm.price}
                                            />
                                            {price && (
                                                (!gatedContentForm.price?.length > 0) && <span className='warnings'>Price can not be empty</span>
                                            )}
                                            {priceNeg && (
                                                gatedContentForm.price?.length > 0 && (!priceValidate.test(gatedContentForm.price)) && <span className='warnings'>Enter valid price</span>
                                            )}
                                            {priceZero && (
                                                gatedContentForm.price < 1 && <span className='warnings'>Price can not be zero</span>
                                            )}
                                        </div>}

                                </form>
                                <PrimaryButton
                                    message={`${pages === 1 ? "Next" : "Publish Gated Content"}`}
                                    className='next-btn'
                                    // onClick={handleSubmit}
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

                </div>
                <Footer
                    className="regForm-footer"
                />
            </div>

        </>
    )
}

export default CreateGatedContent