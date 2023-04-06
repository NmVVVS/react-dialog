import React, {useState} from "react";
import Style from '../assets/style/dialog.module.scss';
import {DialogProps} from "./interface";
import {CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, MinusOutlined} from "@ant-design/icons";

const Dialog: React.FC<DialogProps> = (props) => {


    const [isFullScreen, setFullScreen] = useState<boolean>(false);
    const [isMin, setMin] = useState<boolean>(false);

    let width = "30%", bodyPadding = "20px", min = props.min || true, max = props.max || true;
    if (props.width !== undefined) {
        if (typeof props.width === "number") {
            width = `${props.width}px`;
        } else {
            width = props.width;
        }
    }
    if (props.bodyPadding !== undefined) {
        if (typeof props.bodyPadding === "number") {
            bodyPadding = `${props.bodyPadding}px`;
        } else {
            bodyPadding = props.bodyPadding;
        }
    }

    if (props.visible === false) {
        return null;
    }

    if (isMin) {
        return <div className={Style.minContainer}>
            <div className={Style.title}>{props.title}</div>
            <button className={[Style.actionItem, Style.max, Style.btn].join(' ')}
                    onClick={() => setMin(false)}>
                <FullscreenOutlined/>
            </button>
        </div>
    }

    return <div className={[Style.root, isFullScreen ? Style.fullScreen : Style.normal].join(' ')}>
        <div className={Style.container} style={{width: width}}>
            <div className={Style.header}>
                <div className={Style.title}>{props.title}</div>
                <div className={Style.action}>
                    {
                        min ? <button className={[Style.actionItem, Style.min].join(' ')} onClick={() => setMin(true)}>
                            <MinusOutlined/>
                        </button> : null
                    }
                    {
                        max ? <button className={[Style.actionItem, Style.max].join(' ')}
                                      onClick={() => setFullScreen(!isFullScreen)}>
                            {isFullScreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
                        </button> : null
                    }
                    <button className={[Style.actionItem, Style.close].join(' ')} onClick={props.onClose}>
                        <CloseOutlined/>
                    </button>
                </div>
            </div>
            <div className={Style.body} style={{padding: bodyPadding}}>
                {props.children}
            </div>
            <div className={Style.footer}>
                <button className={[Style.action, Style.close].join(' ')} onClick={props.onClose}>
                    关闭
                </button>
                <button className={[Style.action, Style.confirm].join(' ')} onClick={props.onOk}>
                    确认
                </button>
            </div>
        </div>
    </div>
}

export default Dialog;
