
import { Status } from "./Enums";

const statusStyles = {
    [Status.Active]: { text: "Active", color: "bg-green-500" },
    [Status.Inactive]: { text: "Inactive", color: "bg-gray-500" },
    [Status.UnderApproval]: { text: "Under Approval", color: "bg-yellow-500" },
    [Status.Rejected]: { text: "Rejected", color: "bg-red-500" },
};

export { statusStyles }



