import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, problem_data } from "../config";

const UserProfile = () => {
    const [profile, setProfile] = useState([]);

    const getData = async () => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                console.error("User token is not available");
                return;
            }

            const res = await axios.get(`${BASE_URL}/account/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const submissions = res.data.user.submissions;
            const extractedIds = submissions.map(submission => submission.id);
            console.log("real Id'sss", extractedIds);

            if (res.data) {
                setProfile(extractedIds);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>You solved total {profile.length}</h1>
            <ul>
                {profile.map(id => {
                    const matchingProblem = problem_data.find(problem => problem.id === id);
                    return matchingProblem ? (
                        <div key={id}>
                            <li>ID: {id}</li>
                            <li>Title: {matchingProblem.title}</li>
                            <li>Difficulty: {matchingProblem.difficulty}</li>
                        </div>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default UserProfile;
