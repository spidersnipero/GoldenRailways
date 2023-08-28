const logo  = require('./logo.png');
export default function Logo(){
    return (
        
        <span><img src={logo} alt="Logo" height="70px" width="70px" style={{borderRadius:"50%"}}/></span>
    )
}