import React from 'react';
import './SocialMedia.scss';

const SocialMedia=({source,socialName})=> {
  return (
    <div className='container-fluid social-ivr'>
        <div className='row'>
            <div className='col social'>
                <div className='social-container mr-2'>
                    <img src={source} className='social-icon'/>
                    <span>{socialName}</span>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default SocialMedia;