const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";

// Constant
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

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

    myTransporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const verifiedUser2 = async (getUser) => {
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
      to: getUser?.orgEmail,
      subject: "Account Verification",
      html: `<container>
    <row>
      <columns small="12" >
        
        <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
          
          <div width="350" height="150" align="center" style="border-radius: 50%;">
           <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857306/NYCNi_wvwlde.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
            <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857308/Lagos_kidbfs.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
          </div>

          <tr>
            <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hello ${getUser.orgName} Admin! <br> ${getUser.fullName}'s Account has been Activated</p>
                <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                Account Finally Activated</b><br/>
                <br/>
                This message was sent to you to finally verified ${getUser.fullName} who tries to create an account with NYCC for the on going voting exercise <br/> <br/>

              It is obvious that he/she is a bolivian member of <strong> <${getUser.orgName}</strong>!</br>
                <br/>
                <br/>
                Below is the Voter's Code he/she needs to access their Account!!!

                Please share it with them

                <div>
                  <br/>
                  <br/>
                  <div
                  style="text-decoration: none;
                  padding: 20px 30px;
                  color: white;
                  margin-top: 50px;
                  background-color: #000269;
                  border-radius: 2px;
                  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                  font-size: 30px;
                  width: 80%
                  "
                  ><strong>${getUser.voteCode}</strong> </div>
                </div>
          
                <br />
            </p></td>
          </tr>
        </table>
      </columns>
    </row>
</container>`,
    };

    myTransport.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

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

const verifiedUserFromAdmin1 = async (getUser) => {
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
      to: getUser?.orgEmail,
      subject: "Please Verify this Account",
      html: ` <container>
    <row>
      <columns small="12" >
        
        <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
          
          <div width="350" height="150" align="center" style="border-radius: 50%;">
         <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857306/NYCNi_wvwlde.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
            <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857308/Lagos_kidbfs.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
          </div>

          <tr>
            <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hello ${getUser.orgName} Admin! <br> Request from ${getUser.fullName}</p>
                <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                Account Pending</b><br/>
                <br/>
                This message was sent to you because ${getUser.fullName} tries to create an account with NYCC for the on going voting exercise <br/> <br/>
              Please use the link below to finish up the registration process for <strong> ${getUser.fullName} </strong>!</br>
                <br/>
                <br/>
                Use this Button below to Activate your account!!!

                <div>
                  <br/>
                  <br/>
                  <a 
                    href="https://nycn-vote.web.app/api/user/${getUser._id}/verify" 
                  referrerpolicy="no-referrer" target="_blank" 
                  style="text-decoration: none;
                  padding: 20px 30px;
                  color: white;
                  margin-top: 50px;
                  background-color: #000269;
                  border-radius: 2px;
                  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                  "
                  >Activate <strong>${getUser.fullName} </strong> Account</a>
                </div>
          
                <br />
            </p></td>
          </tr>
        </table>
      </columns>
    </row>
</container>`,
    };

    myTransport.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const verifiedUserFromAdmin2 = async (getUser) => {
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
      to: getUser?.orgEmail,
      subject: "Please Verify this Account",
      html: ` <container>
    <row>
      <columns small="12" >
        
        <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
          
          <div width="350" height="150" align="center" style="border-radius: 50%;">
           <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857306/NYCNi_wvwlde.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
            <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857308/Lagos_kidbfs.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
          </div>

          <tr>
            <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hello ${getUser.orgName} Admin! <br> ${getUser.fullName}'s Account has been Activated</p>
                <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                Account Finally Activated</b><br/>
                <br/>
                This message was sent to you to finally verified ${getUser.fullName} who tries to create an account with NYCC for the on going voting exercise <br/> <br/>

              It is obvious that he/she is a bolivian member of <strong> ${getUser.orgName}</strong>!</br>
                <br/>
                <br/>
                Below is the Voter's Code he/she needs to access their Account!!!

                Please share it with them

                <div>
                  <br/>
                  <br/>
                  <div
                  style="text-decoration: none;
                  padding: 20px 30px;
                  color: white;
                  margin-top: 50px;
                  background-color: #000269;
                  border-radius: 2px;
                  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                  font-size: 30px;
                  width: 80%
                  "
                  ><strong>${getUser.voteCode} </strong> </div>
                </div>
          
                <br />
            </p></td>
          </tr>
        </table>
      </columns>
    </row>
</container>`,
    };

    myTransport.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  verifiedByAdminFinally,
  verifiedUser,
  verifiedUser2,
  verifiedUserFromAdmin1,
  verifiedUserFromAdmin2,
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
