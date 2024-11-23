import { Navigate } from "react-router-dom";
function YoutuberRestrictor({children}) {

    // Check existence of localStorage items
    const youtuberData = localStorage.getItem("youtuberData");
    const github_access_token = localStorage.getItem("github_access_token");
    const github_id = localStorage.getItem("github_id");
    const youtuberId = localStorage.getItem("youtuberId");
    // Ensure youtuberData are valid JSON objects (if present)
    const isYoutuber = youtuberData && JSON.parse(youtuberData);

    if (isYoutuber && github_access_token && github_id && youtuberId) {
        return children;
    }

    // Redirect to login if conditions are not met
    return <Navigate to="/login" replace />;

}

export default YoutuberRestrictor