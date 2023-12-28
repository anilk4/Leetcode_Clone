const ProblemCard = ({ id, title, related_topics, difficulty}) => {

    const Color = (difficulty) => {
        if (difficulty === 'Hard') {
            return 'red';
        } else if (difficulty === 'Medium') {
            return 'orange';
        } else return 'green';
    }

    return (
        <tr>
            <td scope="row" className="link-style">{id}</td>
            <td className="link-style">{title}</td>
            <td className="link-style">{related_topics}</td>
            <td className="link-style">{difficulty}</td>
        </tr>
    )
};

export default ProblemCard;