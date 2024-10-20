import React, {FC, useState} from "react";

interface ModalProps {
    onConfirm: (siding: "regular" | "reverse") => void;
    team1: string;
}

const ConfirmSideModal: FC<ModalProps> = ({ onConfirm, team1 }) => {

    const [isOpen, setIsOpen] = useState(false)
    const handleClick= () => {
        setIsOpen(!isOpen);
    }
    if (!isOpen) return(
        <div id="confirmSideModalAdd">
            <button className="confirmSideModalButton" onClick={handleClick}>Add draft</button>
        </div>
    )

    return (
        <div id="confirmSideModal">
            <div>
                <p>{team1} is on:</p>
                <div onClick={handleClick} className="sideSelectButtonsWrapper">
                    <button className="blueSideButton" onClick={() => onConfirm("regular")}>Blue</button>
                    <button className="redSideButton" onClick={() => onConfirm("reverse")}>Red</button>
                </div>
            </div>
            <button className="cancelSideSelection" onClick={handleClick}>Cancel</button>
        </div>
    );
};

export default ConfirmSideModal;
