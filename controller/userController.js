const userModel = require("../model/userModel");
const organisationModel = require("../model/organisationModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cloudinary = require("../util/cloudinary");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
	verifiedUser,
	verifiedSignUser,
	verifiedByAdmin,
	verifiedByAdminFinally,
	resetMyPassword,
} = require("../util/email");

const {
	verifiedUser2,
	verifiedUserFromAdmin1,
	verifiedUserFromAdmin2,
} = require("../util/newEmail");

const createUser = async (req, res) => {
	try {
		const { fullName, organisationName, email, password } = req.body;

		const findOrg = await organisationModel.findOne({
			organisationName,
		});

		// findOrg?.user.length < 3;

		console.log("Org Name: ", findOrg);
		if (findOrg) {
			if (findOrg?.user.length < 3) {
				const getOrganisation = await organisationModel.findById(findOrg._id);

				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);

				const val = Math.random() * 1000;
				const realToken = jwt.sign(val, "this is the Word");

				const generateToken = crypto.randomBytes(2).toString("hex");

				const img = await cloudinary.uploader.upload(req?.file.path);

				const getUser = await userModel.create({
					fullName,
					email,
					password: hash,
					orgName: organisationName,
					orgEmail: getOrganisation?.email,
					token: realToken,
					image: img.secure_url,
					superAdmin: false,
				});

				getOrganisation?.user.push(new mongoose.Types.ObjectId(getUser._id));
				getOrganisation?.save();

				verifiedUser(getUser).then((result) => {
					console.log("sent: ", result);
				});

				// verifiedByAdminFinally(getUser).then((result) => {
				//   console.log("sent: ", result);
				// });
				return res.json({
					message:
						"Account has been created, please check your mail to finish up the Process!",
				});
			} else {
				return res.status(404).json({
					message: `This ${organisationName} has reached their maximum entry of delegate!`,
				});
			}
		} else {
			return res.json({
				message: `You can't register because ${organisationName} doesn't exist`,
			});
		}
	} catch (err) {
		return res.json({ message: err });
	}
};

const readUsers = async (req, res) => {
	try {
		const read = await userModel.find();
		return res.json({ message: "Reading all Users", data: read });
	} catch (error) {
		return res.json({ message: error });
	}
};

const readUser = async (req, res) => {
	try {
		const read = await userModel.findById(req.params.id);
		return res.json({ message: "Reading all User", data: read });
	} catch (error) {
		return res.json({ message: error });
	}
};

const readOrgUsers = async (req, res) => {
	try {
		// console.log("read");

		const read = await organisationModel.findById(req.params.id);
		// .populate({
		//   path: "user",
		//   options: { createdAt: -1 },
		// });

		console.log(read);

		return res.json({
			message: "Reading all Organisation Users",
			data: read,
		});
	} catch (error) {
		return res.json({ message: error });
	}
};

const VerifiedUser = async (req, res) => {
	try {
		const generateToken = crypto.randomBytes(2).toString("hex");
		const getUser = await userModel.findById(req.params.id);

		if (getUser) {
			console.log("start: ", generateToken);

			await userModel.findByIdAndUpdate(
				req.params.id,
				{
					token: "",
					verified: true,
					voteCode: generateToken,
				},
				{ new: true },
			);

			verifiedUserFromAdmin1(getUser).then((result) => {
				console.log("sent successfully to Admin: ", result);
			});

			res.status(201).json({ message: "Sent successfully to Admin..." });
		} else {
			return res.status(404).json({
				message: "user doesn't exist",
			});
		}
	} catch (err) {
		return res.json({ message: err });
	}
};

const VerifiedUserFinally = async (req, res) => {
	try {
		const { response } = req.body;

		const getUser = await userModel.findById(req.params.id);

		if (response === "Yes") {
			if (getUser) {
				await userModel.findByIdAndUpdate(
					req.params.id,
					{
						token: "",
						verified: true,
					},
					{ new: true },
				);

				verifiedUserFromAdmin2(getUser).then((result) => {
					console.log("sent: ", result);
				});

				res.status(201).json({ message: "Sent..." });
			} else {
				return res.status(404).json({
					message: "user doesn't exist",
				});
			}
		}

		if (response === "No") {
			if (getUser) {
				const findUser = await userModel.findById(req.params.id);

				const name = findUser.orgName;
				const org = await organisationModel.findOne({ name });

				console.log(org);

				org.user.pull(new mongoose.Types.ObjectId(findUser._id));
				org.save();

				await userModel.findByIdAndDelete(req.params.id);
				console.log("new Org: ", org);
				res.status(201).json({ message: "user has been deleted" });
			}
		} else {
			return res.json({ message: "You can't be accepted" });
		}

		res.end();
	} catch (err) {
		return;
	}
};

const signinUser = async (req, res) => {
	try {
		const { email, voteCode, password } = req.body;

		const user = await userModel.findOne({ email });

		if (user) {
			if (user?.verified && user.token === "") {
				if (user.voteCode === voteCode) {
					const pass = await bcrypt.compare(password, user.password);
					if (pass) {
						const getToken = jwt.sign(
							{
								email: user.email,
								_id: user._id,
								fullName: user.fullName,
								superAdmin: user.superAdmin,
							},
							"voteApp",
						);

						const { ...info } = user._doc;

						res.status(200).json({
							message: `welcome back ${user.fullName}`,
							data: { getToken, ...info },
						});
					} else {
						return res.status(404).json({
							message: "error: password is incorrect",
						});
					}
				} else {
					return res.status(404).json({
						message: "error: Your voter's code isn't correct",
					});
				}
			} else {
				return res.status(404).json({
					message: "error: no user hasn't been verified",
				});
			}
		} else {
			return res.status(404).json({
				message: "error: no user found",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "error: ",
			err,
		});
	}
};

const resetPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await userModel.findOne({ email });
		if (user) {
			if (user?.verified && user?.token === "") {
				const token = crypto.randomBytes(5).toString("hex");
				const myToken = jwt.sign({ token }, "ThisIsAVoteApp");

				const name = user?.fullName;

				await userModel.findByIdAndUpdate(
					user._id,
					{ token: myToken },
					{ new: true },
				);
				resetMyPassword(name, user, myToken)
					.then((result) => {
						console.log("message been sent to you: ");
					})
					.catch((error) => console.log(error));

				return res.status(200).json({
					message: "Please check your email to continue",
				});
			} else {
				return res
					.status(404)
					.json({ message: "You do not have enough right to do this!" });
			}
		} else {
			return res.status(404).json({ message: "user can't be found" });
		}
	} catch (error) {
		return res.status(404).json({ message: "An Error Occur " });
	}
};

const changePassword = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await userModel.findById(req.params.id);
		if (user) {
			if (user.verified && user.token === req.params.token) {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(password, salt);

				await userModel.findByIdAndUpdate(
					user._id,
					{
						token: "",
						password: hashed,
					},
					{ new: true },
				);
			}
		} else {
			return res.status(404).json({ message: "operation can't be done" });
		}

		return res.status(200).json({
			message: "password has been changed",
		});
	} catch (error) {
		return res.status(404).json({ message: "An Error Occur" });
	}
};

const searchUser = async (req, res) => {
	try {
		const searchUser = req.query;

		// const makeSearch = req.query
		//   ? {
		//       $or: [
		//         { fullName: { $regex: req.query.search, $options: "i" } },
		//         { _id: { $regex: req.query.search, $options: "i" } },
		//         // { userName: { $regex: req.query.search, $options: "i" } },
		//         //  { accounNumber: { $regex: req.query.search, $options: "i" } },
		//       ],
		//     }
		//   : req.query;

		const user = await userModel.find(searchUser);

		return res.status(200).json({ message: "user found", data: user });
	} catch (error) {
		return res.status(404).json({ message: "An Error Occur" });
	}
};

const searchForUser = async (req, res) => {
	try {
		console.log("search");

		return res.end("Found");
	} catch (error) {
		return res.status(404).json({ message: `error Message: ${error}` });
	}
};

const workOut = async (req, res) => {
	try {
		console.log("search");
		const newQuery = req.query;
		const users = await userModel.find(newQuery);

		return res
			.status(200)
			.json({ message: `search user found`, data: users[0] });
	} catch (error) {
		return res.status(404).json({ message: `error Message: ${error}` });
	}
};

module.exports = {
	createUser,
	readUsers,
	readUser,
	readOrgUsers,
	VerifiedUser,
	VerifiedUserFinally,
	signinUser,
	resetPassword,
	changePassword,
	searchUser,
	searchForUser,
	workOut,
};

// if (user) {
//   const pass = await bcrypt.compare(password, user.password);
//   if (pass) {
//     if (voteCode === user.voteCode) {
//       if (user.verified) {
//         const { ...info } = user._doc;
//         const tokenData = jwt.sign(
//           { id: user._id, fullName: user.fullName, email: user.email },
//           "VoterCode"
//         );

//         return res.status(200).json({
//           message: `welcome back ${user.fullName}`,
//           data: { tokenData, info },
//         });

//       } else {
//         return res.status(404).json({
//           message: "error: user hasn't been verified",
//         });
//       }
//     }
//   } else {
//     return res.status(404).json({
//       message: "error: password not correct",
//     });
//   }
// } else {
//   return res.status(404).json({
//     message: "error: ",
//   });
// }

// const { ...info } = user._doc;
// const tokenData = jwt.sign(
//   { id: user._id, fullName: user.fullName, email: user.email },
//   "VoterCode"
// );
