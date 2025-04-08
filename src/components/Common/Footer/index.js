import React from 'react'
import "./style.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
function Footer() {
  return (
    <>
		<footer class="footer-distributed">
 
			<div class="footer-left">
 
				<h3>Crypto<span>Tracer</span></h3>
 
			</div>
 
			<div class="footer-center">
 
				<div>
					<HomeIcon/>
					<p><span>Pedda masid bazar Vinukonda</span> AndhraPradesh, India</p>
				</div>
 
				<div>
        <LocalPhoneIcon/>
					<p>+91 7671009706</p>
				</div>
 
				<div>
		     <EmailIcon/>
					<p><a href="kaif.presi@gmail.com">kaif.presi@gmail.com</a></p>
				</div>
 
			</div>
 
			<div class="footer-right">
 
				<p class="footer-company-about">
					<span>About the Website</span>
          CryptoTracer is a real-time cryptocurrency price detection platform that provides live updates on market trends and price fluctuations.
				</p>
 
				<div class="footer-icons">
 
					<a href="#"><FacebookIcon/></a>
					<a href="#"><InstagramIcon/></a>
					<a href="#"><LinkedInIcon/></a>
					<a href="#"><GitHubIcon/></a>
 
				</div>
 
			</div>
 
		</footer>
   </>
  )
}

export default Footer;