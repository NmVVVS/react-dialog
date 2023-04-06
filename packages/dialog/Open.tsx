import React, {Component, createRef, PropsWithChildren} from "react";
import ReactDOM, {Root} from "react-dom/client";
import Dialog from "./Dialog";
import {DialogProps} from "./interface";

const dialogInstanceMap = new Map<string, React.RefObject<StandaloneDialog>>();

function ensureUniqDialogInstance(dialogId: string) {
		if (dialogInstanceMap.has(dialogId)) {
				throw new Error(`Duplicate dialog id found: ${dialogId}`);
		}
}

function addDialogInstance(
		dialogId: string,
		ref: React.RefObject<StandaloneDialog>
) {
		dialogInstanceMap.set(dialogId, ref);
}

export interface ICloseDialogOption {
		triggerOnClose?: boolean;
}

interface IStandaloneDialogProps {
		options: Partial<IOpenDialogOption> & { dialogId: string };
		container: HTMLDivElement;
		root: Root;
}

class StandaloneDialog extends Component<PropsWithChildren<IStandaloneDialogProps>> {
		state = {
				visible: true,
		};

		closeOptions: ICloseDialogOption = {};

		close(options: ICloseDialogOption = {}) {
				this.closeOptions = options;
				this.setState({
						visible: false,
				});
		}

		onClosed = () => {
				const {
						root,
						options: {onClose},
						container,
				} = this.props;

				const {triggerOnClose = true} = this.closeOptions;
				if (triggerOnClose && onClose) {
						onClose();
				}
				root.unmount();
				document.body.removeChild(container);
		};

		onClose = (e: unknown) => {
				this.close({
						triggerOnClose: e !== false,
				});
		};

		componentWillUnmount() {
				const {
						options: {dialogId},
				} = this.props;
				dialogInstanceMap.delete(dialogId);
		}

		render() {
				const {options} = this.props;
				const {visible} = this.state;
				return (
						<Dialog
								{...options}
								// onClose={this.onClose}
								onClose={this.onClosed}
								visible={visible}
						/>
				);
		}
}

export function closeDialog(dialogId: string, options: ICloseDialogOption = {}) {
		const dialog = dialogInstanceMap.get(dialogId);

		if (!dialog) {
				return;
		}
		const wrapper = dialog.current;
		if (!wrapper) {
				return;
		}
		wrapper.close(options);
}

export interface IOpenDialogOption extends Omit<DialogProps, 'onClose'> {
		dialogId?: string;
		ref?: (ins: typeof Dialog) => void | React.RefObject<typeof Dialog>;
		parentComponent?: React.ReactInstance;
		onClose?: () => void;
}

/*
  打开一个dialog，返回值是一个用来关闭dialog的函数。
*/
export function openDialog(options: Partial<IOpenDialogOption> = {}) {
		// if (!isBrowser) return noop;

		const {dialogId = new Date().valueOf().toString(), parentComponent} = options;

		ensureUniqDialogInstance(dialogId);

		const container = document.createElement('div');
		document.body.insertBefore(container, null);

		// 确保多次调用close不会报错
		const closeHandler = (triggerOnClose = true) => {
				closeDialog(dialogId, {
						triggerOnClose: triggerOnClose,
				});
		};

		const root = ReactDOM.createRoot(container);
		// ReactDOM.createRoot(container).unmount()
		// const render = ReactDOM.createRoot(container).render;
		// const render = parentComponent ? ReactDOM.unstable_renderSubtreeIntoContainer.bind(
		// 				ReactDOM,
		// 				parentComponent
		// 		)
		// 		: ReactDOM.render;

		const ref = createRef<StandaloneDialog>();

		// 不要依赖render的返回值，以后可能行为会改变
		root.render(
				<StandaloneDialog
						ref={ref}
						options={{
								...options,
								dialogId,
						}}
						container={container}
						root={root}
				/>
		);

		addDialogInstance(dialogId, ref);

		return closeHandler;
}
