import * as Yup from "yup";

export const LoginSchema = Yup.object({
    MemberId: Yup.string().min(2).max(25).required("Please enter your MemberId"),
    Password: Yup.string().min(4).required("Please enter your Password"),
});

const MobileNumberValidation =
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;

export const OGTUserRegistration = Yup.object({
    Username: Yup.string().min(2).max(25).required("Please enter Username"),
    Password: Yup.string().min(6).required("Please enter Password"),
    Biller_Id: Yup.string().min(1).required("Please enter Biller Id"),
    Contact: Yup.string()
        .matches(MobileNumberValidation, "Phone number is not valid")
        .required("Please enter Contact Number"),
    Agency_Name: Yup.string()
        .min(1)
        .max(25)
        .required("Please Select Agency Name"),
    ModelNumber: Yup.string().min(6).required("Please enter Model Number"),
});

export const AgencyRegistration = Yup.object({
    Agency_Name: Yup.string().min(2).max(25).required("Please enter Agency Name"),
    Contact_Person: Yup.string()
        .min(2)
        .max(25)
        .required("Please enter Contact Person Name"),
    Contact_Number: Yup.string()
        .matches(MobileNumberValidation, "Phone number is not valid")
        .required("Please enter Technician Contact Number"),
});

export const AssignOgtSchema = Yup.object({
    Due_Date: Yup.string().min(6).required("Please select Due Date"),
    Start_Date: Yup.string().min(6).required("Please select Start Date"),
});
