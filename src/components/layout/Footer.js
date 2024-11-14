import {Mail} from 'lucide-react'
export default function Footer(){
    return(
        <>
        <div className="p-5 bg-black text-white">
           <div className="lg:flex mt-12 mb-12">
            <div className="w-full mt-10 lg:w-7/12">
                <div>
                <h1 className="text-3xl font-poppins ">Credoff</h1>
                <p className="font-notoSans mt-2 text-gray-400 text-sm">created by Abdul Haq</p>

                </div>
            </div>
            <div className="mt-10 w-full lg:w-5/12 lg:flex justify-around gap-5 font-notoSans">
                <ul className='mb-5'>
                    <li className="font-poppins">Legal</li>
                    <li className="mt-2 text-sm">Terms & Conditions</li>
                    <li className="mt-1 text-sm">Privacy Policy</li>
                    <li className="mt-1 text-sm">Cookies Policy</li>
                </ul>

          

            

                <ul className='mb-5'>
                    <li className="font-poppins">Resourses</li>
                    <li className="mt-2 text-sm">Documentations</li>
                    <li className="mt-1 text-sm">FAQS</li>
                </ul>

                <ul className='mb-5'>
                    <li className="font-poppins">Contacts</li>
                    <li className="mt-2 text-sm">haq@credoff.com</li>
                    <li className="mt-1 text-sm">support@credoff.com</li>
                </ul>
            </div>
           </div>

           <div className='p-5 mt-5 mb-10 border-t border-t-gray-800'>
                <p className='font-poppins mt-5'>For immediate queries:</p>
                <p className='font-notoSans text-sm mt-2'><Mail className='inline size-4 me-2'/> haq.dist@gmail.com</p>
           </div>
        </div>
        </>
    )
}