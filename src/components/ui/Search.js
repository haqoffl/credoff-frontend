export default function Search(props){
    return(
        <div className={props.classes}>
        <input type="text" placeholder="search your tube here..." className="w-full border p-2 focus:outline-none rounded-lg ps-4"/>
    </div>
    )
}