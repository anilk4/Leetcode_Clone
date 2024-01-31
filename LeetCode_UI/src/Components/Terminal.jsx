import { useEffect, useState } from "react";

const Terminal = (props) => {
    const status = props.termi?.data;
    const Output = JSON.parse(props.Exp);
    const language = localStorage.getItem("language");

    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        setError("");

        if (status?.data?.output === true) {
            setIsSuccess(true);
            console.log("Correct code");
        } else if (status?.data?.result.includes("stderr")) { 
            const stderr = JSON.parse(status?.data?.result)?.stderr;
            setIsSuccess(false);
            if (language === "java") {
                const match = stderr.match(/Exception in thread ".+" (.+)$/m) ||
                              stderr.match(/error: (.+)\r\n\s+(.+)\r\n/m);
                setError(match ? match[0] : stderr);
            } else if (language === "py") {
                const tracebackMatch = stderr.match(
                    /File "(.*?)", line (\d+).*?(\w+Error:.+?)(?=\r\n\s*File|$)/s
                );
                setError(tracebackMatch ? tracebackMatch[3] : stderr);
            } else if (language === "js") {
                const errorMatch = stderr.match(/(\w+Error): (.+?)(?=\r\n\s*at |$)/);
                setError(errorMatch ? `${errorMatch[1]}: ${errorMatch[2]}` : stderr);
            } else {
                const match = stderr.match(/Exception in thread ".+" (.+)$/m) ||
                              stderr.match(/error: (.+)\r\n\s+(.+)\r\n/m);
                setError(match ? match[0] : stderr);
            }
            console.log("Syntax error code", error);
        } else {
            setIsSuccess(false);
            let str = status?.data?.result;
            console.log(str);
            let index = str?.indexOf("\r");
            let res = str?.substring(0, index);
            setError(res || "");
            console.log("incorrect output", res);
        }
    }, []);

    return (
        <div>
            {isSuccess ? (
                Output.map((item, index) => (
                    <ul key={index}>
                        <li>{`case ${index}: [${item}]`}</li>
                    </ul>
                ))
            ) : (
                <>
                <div>Wrong Output: </div>
                <div style={{color:'red'}} className="mx-5 ">{error}</div>
                </>
            )}
        </div>
    );
};

export default Terminal;
