export const validEmail = new RegExp(
    '^[a-zA-Z0-9._|\\\\%#~`=?&/$^*!}{+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z ]{2,4}$'
);
// export const EMAIL_VALIDATE = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
export const PHONE_VALIDTE = new RegExp('^[6,7,8,9]{1}[0-9]{9}$');
export const OTP_VALIDATE = "[0-9]{6}";
export const priceValidate = new RegExp("^[0-9]{1,}$")
export const nameValidate = new RegExp("^[a-zA-Z ]{3,16}$")
export const nameWithNumberValidate = new RegExp("^[a-zA-Z0-9 ]{4,16}$")
export const linkValidate = new RegExp("^((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$");
export const UserNameValidate = new RegExp("^[A-Za-z][A-Za-z0-9_]{3,16}$");
