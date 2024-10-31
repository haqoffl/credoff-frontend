import ProgressBar from "@ramonak/react-progress-bar";
export default function ProgressLg(){
    return(
        <>
           <div className="mt-5">
       <ProgressBar completed={60} customLabel=" " barContainerClassName="bar-container" completedClassName="barCompleted w-[10%]"/>
       </div>
        </>
    )
}