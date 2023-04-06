import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {openDialog} from "../packages";

const AA1 = () => {
    const [a, setA] = useState(0);

    const setClick = ()=>{
        console.log("AA");
        setA(1+a);
    }
    return <button onClick={setClick}>点我</button>
}


const Test: React.FC = () => {

    const onClick = () => {
        openDialog({
            children: <div>
                safdfasfasfasd
                <AA1/>
            </div>,
            onClose: () => {
                console.log("AA");
                // closeDialog();
            }
        })
    }

    return <>
        <button onClick={onClick}>显示</button>
    </>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Test/>
);
