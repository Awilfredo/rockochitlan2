import EditIcon from "./Icons/EditIcon";

function EditButton({className, onClick}) {
    return (
        <button className={"text-gray-800 hover:text-blue-700 " + className} onClick={onClick}>
            <EditIcon className="h-6 w-6"></EditIcon>
        </button>
    );
}

export default EditButton;
