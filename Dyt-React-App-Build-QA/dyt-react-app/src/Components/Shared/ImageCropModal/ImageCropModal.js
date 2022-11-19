import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import { Modal } from 'react-bootstrap';
import './ImageCropModal.scss';
import PrimaryButton from './../Button/PrimaryButton';

const ImageCropModal = ({
    showModal,
    setShowModal,
    selectBrandImgage,
    setOutputImage,
    setShowImage,
    header
    // aspectRatio,
}) => {

    const [crop, setCrop] = useState({ aspect: 3 / 4 });
    const [completedCrop, setCompletedCrop] = useState();
    const [aspect, setAspect] = useState(3 / 4)
    const imgRef = useRef();

    const cropImageNow = (e) => {
        e.preventDefault();
        const image = imgRef.current
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        // const reader = new FileReader();
        // reader.addEventListener('load', () => {setOutputImage(reader.result)});
        // reader.readAsDataURL(base64Image);
        // setOutputImage(base64Image);///////

        // const byteCharacters = atob(canvas.toDataURL('image/jpeg'));
        // const byteArrays = [];
        // let contentType='', sliceSize=512

        // for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //     const slice = byteCharacters.slice(offset, offset + sliceSize);

        //     const byteNumbers = new Array(slice.length);
        //     for (let i = 0; i < slice.length; i++) {
        //     byteNumbers[i] = slice.charCodeAt(i);
        //     }

        //     const byteArray = new Uint8Array(byteNumbers);
        //     byteArrays.push(byteArray);
        // }

        // const blob = new Blob(byteArrays, {type: contentType});
        let imageC;
        const reader = new FileReader()
        // canvas.toBlob(blob => {
        //   reader.readAsDataURL(blob)
        //   reader.onloadend = () => {
        //     imageC = reader.result;
        //   }
        // })

        let filename = 'brandLogo.png'
        let arr = base64Image && base64Image.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, { type: mime });
        setOutputImage(croppedImage);
        setShowImage(base64Image)
        setShowModal(false);
    };

    return (
        <Modal className="dyt-imagecrop" size="md" show={showModal} onHide={() => { setShowModal(false) }} shouldCloseOnOverlayClick={false} backdrop="static" keyboard={false}  >
            <Modal.Body>
                <div className="mb-3 dyt-imagecrop__header">
                    <p className="dyt-imagecrop__tittle text-center mb-0">
                        {header}
                    </p>
                    <hr className="mt-1" />
                    <i className="fa fa-close dyt-imagecrop__close" onClick={() => { setShowModal(false) }} ></i>
                </div>
                <ReactCrop
                    crop={crop}
                    onChange={c => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                // style={{ width: "500px", maxHeight: "500px", marginLeft: "auto", padding: "auto" }}


                // disabled = {true}
                // onDragStart ={(c)}
                // locked = {true}
                // keepSelection = {true}
                >
                    <img ref={imgRef} src={selectBrandImgage} />
                </ReactCrop>
                <div><sup className='ml-2' style={{ color: "red" }}>Crop the Image according to your need in 4X3 ratio </sup></div>
                <div className="mt-3 text-center">
                    <PrimaryButton
                        name="UPLOAD"
                        onclick={(e) => cropImageNow(e)}
                    />
                </div>
            </Modal.Body>

        </Modal >
    )
}

ImageCropModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    selectBrandImgage: PropTypes.string,
    setOutputImage: PropTypes.func,
    setShowImage: PropTypes.func,
    // aspectRatio: PropTypes.number,
}

export default ImageCropModal;