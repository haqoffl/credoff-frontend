import { Navigate } from "react-router-dom";

function LearnerRestrictor({ children }) {
    console.log("triggered the restrictor");

    // Check existence of localStorage items
    const learnerData = localStorage.getItem("learnerData");
    const github_access_token = localStorage.getItem("github_access_token");
    const github_id = localStorage.getItem("github_id");
    const learnerId = localStorage.getItem("learnerId");
    // Ensure learnerData and youtuberData are valid JSON objects (if present)
    const isLearner = learnerData && JSON.parse(learnerData);

    if (isLearner && github_access_token && github_id && learnerId) {
        return children;
    }

    // Redirect to login if conditions are not met
    return <Navigate to="/login" replace />;
}

export default LearnerRestrictor;
