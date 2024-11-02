import ProgressBar from "@ramonak/react-progress-bar";
export default function ProgressLg({completion}){

    return(
        <>
                      <div className="mt-5 w-full h-2 bg-gray-100 relative rounded-lg">
   <span
      className="absolute block top-0 bottom-0 h-full p-1 bg-primary rounded-lg"
      style={{ width: `${completion}%` }}
   ></span>
</div>
       
        </>
    )
}