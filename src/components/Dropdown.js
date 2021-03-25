import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ dropdownList, head, sendSeletecItem }) => {
    const [open, setOpen] = useState(false);
    const [dropdownHead, setDropdownHead] = useState(head);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener("click", onBodyClick);

        return () => {
            document.body.removeEventListener("click", onBodyClick);
        };
    }, []);

    const handleDropdownItemSelected = event => {
        const chosenItem = event.target.firstChild.data;
        setDropdownHead(chosenItem);

        sendSeletecItem(chosenItem);
    };

    const dropdownItems = dropdownList.map(listItem => {
        if (listItem === dropdownHead) {
            return null;
        }
        return (
            <div
                key={listItem}
                className="item"
                onClick={handleDropdownItemSelected}
            >
                {listItem}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open && "visible active"}`}>
                    <i className="dropdown icon" />
                    <div className="text">{dropdownHead}</div>
                    <div className={`menu ${open && "visible transition"}`}>{dropdownItems}</div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;