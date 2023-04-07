import React, {CSSProperties, useState} from "react";
import Style from '../assets/style/dialog.module.scss';
import {DialogProps} from "./interface";

const Dialog: React.FC<DialogProps> = (props) => {


		const [isFullScreen, setFullScreen] = useState<boolean>(false);
		const [isMin, setMin] = useState<boolean>(false);
		const actionIconStyle: CSSProperties = {
				width: 18,
				height: 18,
		}
		const focusIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="focus" style={actionIconStyle}>
				<path fill="#0092E4"
							d="M8,2H3A1,1,0,0,0,2,3V8A1,1,0,0,0,4,8V4H8A1,1,0,0,0,8,2ZM8,20H4V16a1,1,0,0,0-2,0v5a1,1,0,0,0,1,1H8a1,1,0,0,0,0-2ZM21,2H16a1,1,0,0,0,0,2h4V8a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2Zm0,13a1,1,0,0,0-1,1v4H16a1,1,0,0,0,0,2h5a1,1,0,0,0,1-1V16A1,1,0,0,0,21,15Z"></path>
		</svg>;
		const compressIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="compress"
															style={actionIconStyle}>
				<path fill="#0092E4"
							d="M16,9h5a1,1,0,0,0,0-2H17V3a1,1,0,0,0-2,0V8A1,1,0,0,0,16,9ZM8,15H3a1,1,0,0,0,0,2H7v4a1,1,0,0,0,2,0V16A1,1,0,0,0,8,15ZM8,2A1,1,0,0,0,7,3V7H3A1,1,0,0,0,3,9H8A1,1,0,0,0,9,8V3A1,1,0,0,0,8,2ZM21,15H16a1,1,0,0,0-1,1v5a1,1,0,0,0,2,0V17h4a1,1,0,0,0,0-2Z"></path>
		</svg>
		const minusIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus" style={actionIconStyle}>
				<path fill="#0092E4" d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"></path>
		</svg>
		const multiplyIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="multiply"
															style={actionIconStyle}>
				<path fill="#0092E4"
							d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
		</svg>


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
						<button className={[Style.actionItem, Style.max, Style.btn].join(' ')} onClick={() => setMin(false)}>
								{focusIcon}
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
														{minusIcon}
												</button> : null
										}
										{
												max ? <button className={[Style.actionItem, Style.max].join(' ')}
																			onClick={() => setFullScreen(!isFullScreen)}>
														{isFullScreen ? compressIcon : focusIcon}
												</button> : null
										}
										<button className={[Style.actionItem, Style.close].join(' ')} onClick={props.onClose}>
												{multiplyIcon}
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
