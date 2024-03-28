import instagram from '../../assets/social-media/instagram.png'
import X from '../../assets/social-media/X.png'
import facebook from '../../assets/social-media/facebook.png'
import linkedIn from '../../assets/social-media/linkedin.png'

export default function SocialMediaButtons() {
    const socialMediaLinks = [{
        name: 'Linkedin',
        imgURL: linkedIn,
        link: 'https://github.com/Valentino-La-Villa'
    }, {
        name: 'X',
        imgURL: X,
        link: 'https://github.com/Valentino-La-Villa'
    }, {
        name: 'Instagram',
        imgURL: instagram,
        link: 'https://github.com/Valentino-La-Villa'
    }, {
        name: 'Facebook',
        imgURL: facebook,
        link: 'https://github.com/Valentino-La-Villa'
    }]

    const socialMediaButtons = socialMediaLinks.map(socialMedia => {
        return (
            <div className='col-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <a key={socialMedia.name}
                    className='socialMediaButton--custom' href={socialMedia.link} target='_blank' // Custom css property is used to implement scale up animation on hover
                    >
                        <img className='rounded-3 img-fluid' src={socialMedia.imgURL} alt="" />
                    </a>
            </div>
        )
    })
    return (
        <div className='d-flex flex-row gap-3 container justify-content-center px-3 col-12 col-md-6 col-xl-5 pt-3 pt-md-0 position-relative '>
            <div className='row'>
                {socialMediaButtons}
            </div>
            <p className=' d-none d-md-block
            position-absolute translate-middle-y top-50 m-0 fs-5 d-none' style={{fontFamily: 'Bebas Neue'}}>You can find us on</p>
        </div>
    )
}