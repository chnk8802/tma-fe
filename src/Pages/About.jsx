import { Image } from "react-bootstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function About (props) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-between">
    <Header {...props} />
    <div className="container">
        <div className="col-xs-12 d-flex justify-content-center align-items-center" >
        <Image className="p-5 w-50" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png"></Image>
        </div>
    <div className="col-xs-12 p-3 mx-3 mx-sm-0 text-justify" style={{"text-align": "justify"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis blandit mauris. Praesent id nunc nunc. Fusce vehicula dictum tortor, id finibus dolor gravida id. Curabitur non lectus vel ligula volutpat placerat. Proin nec libero tortor. In et finibus ipsum. Ut fringilla velit in pellentesque consequat.
<br/>
<br/>
Vestibulum aliquet, magna sed faucibus euismod, nunc magna laoreet magna, id cursus nisi massa sed dui. Maecenas felis sapien, volutpat eu tincidunt vitae, facilisis nec odio. Integer euismod, ex non hendrerit lobortis, quam magna porttitor ex, at hendrerit lacus nunc et felis. Vivamus ut quam lacinia quam maximus accumsan. Integer consequat risus ac lectus pharetra, id egestas mauris tristique. Aliquam erat volutpat. Sed viverra gravida lorem vitae sollicitudin. Maecenas semper lectus sit amet risus accumsan pellentesque. Cras venenatis ut lectus vitae dictum. Nulla euismod tellus sed suscipit posuere. Vivamus ut leo eu orci lacinia faucibus. Donec commodo eget metus pulvinar dictum. Sed rhoncus, velit vitae dapibus ornare, tellus magna commodo risus, ac porta leo velit id neque. Donec viverra volutpat ipsum, at interdum est vehicula eget. Curabitur iaculis hendrerit quam quis fermentum.</div>
    {/* <div className="col-xs-12 col-sm-4 bg-success">das</div> */}
    </div>
    <Footer />
</div>
    );
}

export default About;