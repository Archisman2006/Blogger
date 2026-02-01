export  function Footer(){
return(
    <div className="h-60 bg-purple-200 w-screen flex justify-around border-t-2 mt-5 text-[15px]">
        <div className="mr-80"><img src='./src/BLOGGER.png' className="w-30" alt="" /></div>
        <div className="flex flex-col justify-around items-center ml-110">
            <div className="text-gray-600">COMPANY</div>
            <div>Features</div>
            <div>Pricing</div>
            <div>Affiliate program</div>
            <div>Press kit</div>
        </div>
        <div className="flex flex-col justify-around items-center">
            <div className="text-gray-600">SUPPORT</div>
            <div>Account</div>
            <div>Help</div>
            <div>Contact Us</div>
            <div>Customer Support</div>
        </div>
        <div className="flex flex-col justify-around items-center">
            <div className="text-gray-600">LEGALS</div>
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
            <div>Licensing</div>
        </div>
    </div>
)
}