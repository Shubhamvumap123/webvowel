const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const Mailtoken = require('../models/mailtoken')
require('dotenv').config()

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}

const register = async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({ message: "Email already exists" })
        }

        user = await User.create(req.body)
    // console.log("shubham", user._id)
        let emailToken = await new Mailtoken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

        // const verify = jwt.sign(process.env.SECRET_MAIL)
        const token = generateToken(user)

        const message = `${process.env.BASE_URL}/verify/${user._id}/${emailToken.token}`;
        await sendEmail(user.email, "Verify Email", message);
        // console.log(user.email, "Verify Email", message)
        return  res.send({ user, token })

    } catch (error) {
        console.log(error)
        res.status(400).send({ message: error.message })
    }
}

const verify = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      const token = await Mailtoken.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({
        _id: user._id
      }, { verified: true });
      await Mailtoken.findByIdAndRemove(token._id);
  
      res.redirect('https://webvowel.vercel.app/login');

    } catch (error) {
        console.log(error)
      res.status(400).send("An error occured");
    }

  };

const login = async (req, res) => {
    try {
      console.log(req.body);
        const user = await User.findOne({ email: req.body.email })

        if(!user){
            return res.status(400).send({message:"Wrong Email and Password 1"})
        }
        console.log(req.body.email,req.body.password,user.password)
        const match = user.checkPassword(req.body.password);

        if (!match) {
            return res.status(500).send({ message: "Wrong Email and Password 2" })
        }
        const token = generateToken(user)
      
      
          await User.findByIdAndUpdate(req.params.id,{verified: true });

      console.log(user);
        return res.status(200).send({ user,token })

    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
}

const getUser = async (req, res) => {
  try {
      const user = await User.findById(req.user.id)
      return res.status(200).send(user)
  } catch (error) {
      return res.status(404).send({ message: error.message })
  }
}


module.exports = { register, login ,verify , getUser}