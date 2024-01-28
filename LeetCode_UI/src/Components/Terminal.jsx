const Terminal = (props) => {
    const status = props.termi?.data;

    if (status?.data?.output === true){
        console.log("correct code");

    } else if (status?.data?.result.includes("stderr")) {
        console.log("Syntax error code")
    } else {
        let str = (status?.data?.result)
        let index = str?.indexOf('\r');
        let res = str?.substring(0, index);
        console.log("Else block", res)
    }
    return (
        <></>
    )
}

export default Terminal;