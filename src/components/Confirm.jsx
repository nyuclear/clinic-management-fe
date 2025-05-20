import React from "react";
import { Modal, Button } from "antd";

export default function Confirm({isOpen, title, content, onOk, onCancel}) {
    return (
        <Modal 
        open={isOpen}
        onCancel={onCancel}
        footer={null}
        >
            <p>{title}</p>
            <p>{content}</p>
            <div className="flex justify-end">
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onOk}>Ok</Button>
            </div>
        </Modal>
    )
}