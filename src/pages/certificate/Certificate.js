import { useRef, useState } from "react"
import certificateTemplate from "../../assets/png/certificateTemplate.png"
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
export default function Certificate(){
    let [data,setData]=useState({
        name:"Mohamed Abdul Kathar Jailani",
        course:"Web Development Fundamentals: HTML, CSS, JavaScript, and Bootstrap for Beginners",
        issuedAt:"02.11.2023",
        courseBy:"Error makes clever",
        language:"English",
        scored_at_quiz:10,
        scored_at_project:10
    })
let target = useRef()

const downloadPDF = () => {
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
  };

  const generateCanvas = async () => {
    // Wait a moment for rendering
    await new Promise((resolve) => setTimeout(resolve, 100));

    const element = document.getElementById('capture');
    if (!element) {
      console.error('Capture element not found!');
      return;
    }

    // Use html2canvas to take a screenshot of the element
    html2canvas(element, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'certificate.png'; // Specify the download filename
      link.click(); // Trigger the download
    }).catch((err) => {
      console.error('Error capturing canvas:', err);
    });
  };

    return(
        <>
      <div id="capture" className="m-0 p-0 relative w-[1097px] h-[794px] bg-cover bg-white" ref={target}  style={
        {
            backgroundImage:`url(${certificateTemplate})`,

        }
      }>
<p className="text-5xl font-NotoSans font-bold w-full  text-center absolute top-[45%] text-[#343434]"  >{data.name.toUpperCase()}</p>

<p className="text-3xl font-poppins font-bold w-8/12 absolute top-[25%] text-[#343434] left-12"  >{data.course.toUpperCase()}</p>
<p className="font-notoSans text-lg absolute right-[52%] top-14 bg-">{data.issuedAt}</p>
<p className="font-notoSans text-lg absolute right-[31%] top-14">{data.language}</p>
<p className="font-notoSans text-3xl absolute top-[72.4%] left-[34.5%]">{data.scored_at_quiz}</p>
<p className="font-notoSans text-3xl absolute top-[72.5%] right-[30.5%]">{data.scored_at_project}</p>
<p className="font-notoSans  font-bold absolute top-[57%] text-center text-[#343434] w-full ">{data.courseBy}</p>
<div className="absolute top-[74%] left-[5%]" style={{
          padding: '20px',
          display: 'inline-block',
          backgroundColor: '#fff', // Ensure the background is white
        }}>
<QRCode value="https://www.canva.com/design/DAGVV6OiIjk/lFTW33ykNc7ADzcRH69ugw/edit" style={{width:"150px",height:"150px"}}/>
</div>
      </div>
      <button className="bg-primary text-white p-2"onClick={() => generateCanvas()}>Download PNG</button>
      <button className="bg-red-600 text-white p-2" onClick={() => downloadPDF()}>Download PDF</button>

        </>
    )
}