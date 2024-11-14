function Spinner({sizeClass}){
    return(
        <>
        <span   className={`animate-spin inline-block p-1 border-l-4 border-t-4 border-r-4 border-primary border-dotted rounded-full me-2 ${sizeClass}`}> </span>
        </>
    )

}
export default Spinner