const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Changing Items

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";

// Again // External Items

// const GOOGLE_SECRET = "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";
// const GOOGLE_ID =
//   "922981826695-rviuikdrd4rk1kbsake7iusml8qb2ibc.apps.googleusercontent.com";
// const GOOGLE_REFRESHTOKEN =
//   "1//04C7dWmo7YblKCgYIARAAGAQSNwF-L9IrEt7Td5GJtrIEB-g_xad5nm-lvt6tP-RxNPBAoaHu0q1jNXf8c20Bsv89GRyec94Gri4";

// Constant
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url = "https://nycn-vote.web.app";
const urlLocal = "localhost:2245";

const verifiedUser = async (getUser) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    const buildFile = path.join(__dirname, "../views/AccountCreated.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: getUser.fullName,
      id: getUser?._id,
      realToken: getUser.token,
      organisation: getUser?.orgName,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      to: getUser?.email,
      subject: "Account Verification",
      html: data,
    };

    myTransport.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const verifiedByAdmin = async (getUser) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    const buildFile = path.join(__dirname, "../views/viewByAdmin.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: getUser?.fullName,
      organisation: getUser?.orgName,
      id: getUser?._id,
      code: getUser.voteCode,
    });

    console.log(getUser?.orgEmail);

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      // to: getUser?.orgEmail,
      to: getUser?.orgEmail,
      subject: "Please Verify this Account",
      html: data,
    };

    myTransporter.sendMail(mailOptions, () => {
      console.log("sent successfully to Admin");
    });
  } catch (error) {
    return error;
  }
};

const verifiedByAdminFinally = async (getUser) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    console.log("userData: ", getUser);

    const buildFile = path.join(__dirname, "../views/voterCode.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: getUser?.fullName,
      organisation: getUser?.orgName,
      id: getUser?._id,
      code: getUser.voteCode,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      to: getUser?.orgEmail,
      subject: `${getUser?.fullName}'s Account has been Verify`,
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const verifiedSignUser = async (findUser) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    const buildFile = path.join(__dirname, "../views/signinAccount.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: findUser?.fullName,
      id: findUser?._id,
      myToken: findUser?.token,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
      to: findUser?.email,
      subject: "Account re-Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const resetMyPassword = async (name, user, myToken) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");

    const data = await ejs.renderFile(buildFile, {
      name,
      id: user?._id,
      myToken,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
      to: user?.email,
      subject: "Requesting for Password Reset",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const acceptance = async (email, positioned) => {
  try {
    console.log("position from email: ", positioned?.position);

    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    const buildFile = path.join(__dirname, "../views/Acceptance.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: positioned?.fullName,
      position: positioned?.position,
      email: email,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
      to: email,
      subject: `Acceptance for the Position of ${positioned?.position}`,
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  verifiedUser,
  verifiedByAdmin,
  verifiedByAdminFinally,
  verifiedSignUser,
  resetMyPassword,
  acceptance,
};

// `  <container>
//     <row>
//       <columns small="12" >

//         <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">

//           <div width="350" height="150" align="center" style="border-radius: 50%;">
//            <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857306/NYCNi_wvwlde.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
//             <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857308/Lagos_kidbfs.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
//           </div>

//           <tr>
//             <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hello! <br> ${getUser.fullName}</p>
//                 <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
//                 Congratulations!!!</b><br/>
//                 Thank you for creating an account with "Ajegunle Youth Council Voting Platform", <br/>Now you can carry out your VOTING RIGHT successfully <br/>

//                 <strong style="color: red">Please follow the instruction to finish up!</strong>  </br>
//                 <br/>
//                 <br/>
//                 Use this Button below to get your voting code access from your organisation <strong > ${getUser.orgName} </strong>!admin!!!

//                 <div>
//                   <br/>
//                   <br/>
//                   <a
//                     href="http://localhost:3000/api/user/${getUser._id}/token"
//                   referrerpolicy="no-referrer" target="_blank"
//                   style="text-decoration: none;
//                   padding: 20px 30px;
//                   color: white;
//                   margin-top: 50px;
//                   background-color: #000269;
//                   border-radius: 2px;
//                   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
//                   "
//                   >Request for your Code</a>
//                 </div>

//                 <br />
//             </p></td>
//           </tr>
//         </table>
//       </columns>
//     </row>
// </container>`;
