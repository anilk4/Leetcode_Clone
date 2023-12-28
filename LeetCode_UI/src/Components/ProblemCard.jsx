const ProblemCard = ({ id, title, related_topics, difficulty}) => {
    return (
        <ul>
            <li>{id}</li>
            <li>{title}</li>
            <li>{related_topics}</li>
            <li>{difficulty}</li>
        </ul>
    )
};

export default ProblemCard;