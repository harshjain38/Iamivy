import classes from "./footer.module.css";
import instagram from "../../../assests/instagram.png";
import linkedin from "../../../assests/social.png";
import twitter from "../../../assests/twitter.png";

const Footer = () => {
    return <div className={classes.main}>
        <div className={classes.list}>
            <div className={classes.left}>
                <h2>Get Involved</h2>
                <h3>Blog</h3>
            </div>
            <div className={classes.left}>
                <h2>About</h2>
                <h3>Privacy Policy</h3>
                <h3>Media Inquiries</h3>
                <h3>Contact Us</h3>
            </div>
        </div>
        <div className={classes.social}>
            <img src={instagram} alt='instagram' className={classes.insta}/>
            <img src={linkedin} alt='linkedin' className={classes.linked}/>
            <img src={twitter} alt='twitter' className={classes.twitt}/>
        </div>
        <div className={classes.copy}>&copy; Ivy Technologies Inc.</div>
    </div>
};

export default Footer;