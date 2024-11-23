import { useEffect, useRef, useState } from "react"
import certificateTemplate from "../../assets/png/certificateTemplate.png"
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Certificate(){
  let {learnerId,tubeId} = useParams()
    let [data,setData]=useState(null)
let target = useRef()

useEffect(()=>{
if(learnerId&&tubeId){
  console.log(learnerId,tubeId)
  axios.get(`${process.env.REACT_APP_BACKEND_URL}certificate/getCertificate/${learnerId}/${tubeId}`).then(res=>{
    console.log(res.data)
    setData(res.data)
  }).catch(err=>console.log(err))
}
},[])
const downloadPDF = () => {
  target.current.style.display = "block";
    const input = target.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
console.log(canvas.height,canvas.width)
      const pdf = new jsPDF({
        orientation: "landscape", // or "portrait" depending on your certificate layout
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    });
    target.current.style.display = "none";

  };

  const generateCanvas = async () => {
    target.current.style.display = "block";
    const input = target.current;
    // Use html2canvas to take a screenshot of the element
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'certificate.png'; // Specify the download filename
      link.click(); // Trigger the download
    }).catch((err) => {
      console.error('Error capturing canvas:', err);
    });

    target.current.style.display = "none";

  };

    return(
        <>
{data !== null ?  <div>
  <div className="flex justify-center mt-10">
     <div className="flex gap-4 border rounded-lg w-full lg:w-6/12 p-10 shadow">
        <div>
        <p>Click the type you need to download</p>
        <div className="mt-10 flex gap-4">
        <button className="block bg-primary text-white p-2"onClick={() => generateCanvas()}>Download as PNG</button>
<button className="block bg-red-600 text-white p-2" onClick={() => downloadPDF()}>Download as PDF</button>

        </div>

        </div>
       </div>
     </div>
      <div id="capture" className={`m-0 p-0 relative w-[1097px] h-[794px] bg-cover bg-white `} ref={target}  style={
        {
            backgroundImage:`url(${certificateTemplate})`,
            display:"none"

        }
      }>
<p className="text-5xl font-NotoSans font-bold w-full  text-center absolute top-[45%] text-[#343434]"  >{data.learnerName.toUpperCase()}</p>

<p className="text-3xl font-poppins font-bold w-8/12 absolute top-[25%] text-[#343434] left-12"  >{data.tubeName.toUpperCase()}</p>
<p className="font-notoSans text-lg absolute right-[52%] top-14 bg-">{data.issuedDate.split('T')[0]}</p>
<p className="font-notoSans text-lg absolute right-[31%] top-14">{data.language}</p>
<p className="font-notoSans text-3xl absolute top-[72.3%] left-[34.5%]">{data.scoredAtQuiz}</p>
<p className="font-notoSans text-3xl absolute top-[72.5%] right-[30.5%]">{data.scoredOnAiEvaluationAtProject}</p>
<p className="font-notoSans  font-bold absolute top-[57%] text-center text-[#343434] w-full ">{data.youtuberChannelName}</p>
<div className="absolute top-[74%] left-[5%]" style={{
          padding: '20px',
          display: 'inline-block',
          backgroundColor: '#fff', // Ensure the background is white
        }}>
<QRCode value={process.env.REACT_APP_URL+"user/"+localStorage.getItem('learnerId')+"/"+data.tubeId+"/verify"} style={{width:"150px",height:"150px"}}/>
</div>
      </div>
  </div>:<p className="text-center mt-10 font-poppins">please wait....</p>}
     
        </>
    )
}