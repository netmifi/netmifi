const emailSubjects = {
    verification_code: "Verification Code",
    email_verified: "Email Verification",
    registration_successful: "Welcome To Netmifi",
    registration_successful: "Welcome To Netmifi",
    instructor_accepted: "Welcome To Netmifi Legion",
}

function verificationCodeTemplate(code) {
    return `
        <tr>
            <td>
                <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                    Hello,</h1>
                <p style="margin: 0 0 12px 0; line-height: 24px;">Here is your verification code, please do not share to anyone:</p>
                <p
                    style="margin: 0 0 12px 0; line-height: 24px; font-size: 25px; font-weight: bold; color: hsl(0, 100%, 31%); text-align: center; border: 2px solid hsl(0, 100%, 31%); padding: 10px;">
                    ${code}
                </p>
                <p style="margin: 0 0 12px 0; line-height: 24px;">This code will expire in 10
                    minutes. If you didn't request this code, please ignore this email or
                    contact support if you have concerns.</p>
                <p style="margin: 0; line-height: 24px;">Thank you for using our service!</p>
            </td>
        </tr>
`}


function emailVerifiedTemplate() {
    return `
    <tr>
        <td>
            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                Hello,</h1>
            <p style="margin: 0 0 12px 0; line-height: 24px;">Your email was flagged for
                verification and has been verified.</p>

            <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
            <p style="margin: 0; line-height: 24px;">Thank you for choosing our service!</p>
        </td>
    </tr>`;
}
function registrationSuccessfulTemplate() {
    return `
    <tr>
        <td>
            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                Welcome To Netmifi,</h1>
            <p style="margin: 0 0 12px 0; line-height: 24px;">Your email was registered on
                our platform. We are happy to see you being part of Netmifi, we hope to see you become better in your chosen career.</p>

            <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
            <p style="margin: 0; line-height: 24px;">Thank you for choosing our service!</p>
        </td>
    </tr>`
}
function passwordChangedTemplate() {
    return `
    <tr>
        <td>
            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                Password Change Successful,
            </h1>
            <p style="margin: 0 0 12px 0; line-height: 24px;">Your password was changed successfully.</p>
                <p style="margin: 0 0 12px 0; line-height: 24px;">If you make this request, please
                 contact support if you have concerns.
                </p>
            <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
            <p style="margin: 0; line-height: 24px;">Thank you for choosing our service!</p>
        </td>
    </tr>`
}

function instructorAcceptedTemplate() {
    return `
        <tr>
            <td>
                <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                    Hello,</h1>
                <p style="margin: 0 0 12px 0; line-height: 24px;">Your request to be an
                    instructor has been accepted. You can now upload your courses at a go.</p>

                <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
                <p style="margin: 0; line-height: 24px;">Thanks for choosing our Netmifi!</p>
            </td>
        </tr>`;
}

module.exports = {
    emailSubjects,
    verificationCodeTemplate,
    emailVerifiedTemplate,
    registrationSuccessfulTemplate,
    passwordChangedTemplate,
    instructorAcceptedTemplate
}