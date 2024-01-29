import { useEffect, useState } from "react";

const Terminal = (props) => {
  const status = props.termi?.data;

  const language = localStorage.getItem("language");

  const [error, setError] = useState();

  useEffect(() => {
    setError("");
    if (status?.data?.output === true) {
      console.log("correct code");
    } else if (status?.data?.result.includes("stderr")) {
      const stderr = JSON.parse(status?.data?.result).stderr;

      if (language === "java") {
        const match =
          stderr.match(/Exception in thread ".+" (.+)$/m) ||
          stderr.match(/error: (.+)\r\n\s+(.+)\r\n/m);
        //   console.log(match);
        setError(match ? match[0] : stderr);
      } else if (language === "py") {
        const tracebackMatch = stderr.match(
          /File "(.*?)", line (\d+).*?(\w+Error:.+?)(?=\r\n\s*File|$)/s
        );
        // console.log(tracebackMatch)
        if (tracebackMatch) {
          setError(tracebackMatch[3]);
        } else {
          setError(stderr);
        }
      } else if (language === "js") {
        const errorMatch = stderr.match(/(\w+Error): (.+?)(?=\r\n\s*at |$)/);
        // console.log(errorMatch)
        if (errorMatch) {
          const [, errorType, errorMessage] = errorMatch;
          setError(`${errorType}: ${errorMessage}`);
        } else {
          setError(stderr);
        }
      } else {
        const match =
          stderr.match(/Exception in thread ".+" (.+)$/m) ||
          stderr.match(/error: (.+)\r\n\s+(.+)\r\n/m);
        setError(match ? match[0] : stderr);
      }
      console.log("Syntax error code", error);
    } else {
      let str = status?.data?.result;
      let index = str?.indexOf("\r");
      let res = str?.substring(0, index);
      console.log("Else block", res);
    }
  }, []);
  return <>{error}</>;
};

export default Terminal;
