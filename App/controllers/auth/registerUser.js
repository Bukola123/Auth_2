const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const { sendMail } = require('../../utils/index');
const sgMail = require('@sendgrid/mail');
const { getMaxListeners } = require('../../models/role');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



//This route is only available to registering a store owner
exports.registerUser = async function (req, res) {
    //  check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password} = req.body;
    //  hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(1 * Math.random() * 9000);

    const user = new User({
        email,
        password: hashedPassword,
        otp
    });

    // save the user
    try {
        //send verification email
        // const subject = 'Verify your account';
        // const text = `Hello ${
        //     user.email
        // },\n\nPlease verify your account by clicking the link below.\n\nhttps://store-manager-app.herokuapp.com/api/v1/auth/verify?otp=${otp}&id=${
        //     user._id
        // }`;
        // await sendMail(email, subject, text);

        // const msg = {
        //     to: user.email,
        //     from: 'taiwobukola98@gmail.com',
        //     // templateId: 'd-f43daeeaef504760851f727007e0b5d0',
        //     dynamic_template_data: {
        //       subject: 'Testing Templates',
        //       name: user.email,
        //       city: 'Nigeria',
        //     },
        //   };
        //   sgMail.send(msg);


        const msg = {
            to: user.email,
            from: 'taiwobukola98@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          }
          
          sgMail
            .send(msg)
            .then((response) => {
              console.log(response[0].statusCode)
              console.log(response[0].headers)
            })
            .catch((error) => {
              console.error(error)
            })
        await user.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }
        return res.status(500).json({ err });
    }

    

    res.status(201).json({ msg: 'Registration Successful' });
};
