import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
        <div className='main-footer py-2'>
            <div className='container-fluid'>
                <div className='row footer-content p-3'>
                    <div className='col-md-3 col-sm-6'>
                        <div className='logo-font pb-3'>urDash</div>
                        <div className='inline'>
                            <div>Facebook</div>
                            <div>Instagram</div>
                            <div>Twitter</div>
                        </div>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                        <ul className='divst-unstyled'>
                            <div>Batam</div>
                            <div>Indonesia</div>
                        </ul>
                    </div>
                    
                </div>
                <div className='text-xs-center'>
                    <p>&copy; {new Date().getFullYear()} - All Rights Reserved</p>
                </div>
            </div>
        </div>
  )
}

export default Footer