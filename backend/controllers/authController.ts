import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
export const authRegister = async (req: any, res: any) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash: hash,
      avatar: req.body.avatar,
    })

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      { expiresIn: '30d' }
    )

    const bdAnswer = await user.save()
    const { passwordHash, ...userInfo } = bdAnswer._doc

    res.status(200).json({
      ...userInfo,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Возникла ошибка',
    })
  }
}

export const authLogin = async (req: any, res: any) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    })
    if (!user) {
      res.status(404).json({
        message: 'Пользователь не найден',
      })
    } else {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user.passwordHash
      )

      if (!isValidPass) {
        return res.status(404).json({
          message: 'Неверный логин или пароль',
        })
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secret123',
        { expiresIn: '30d' }
      )
      const { passwordHash, ...userInfo } = user._doc

      res.status(200).json({
        ...userInfo,
        token,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Возникла ошибка',
    })
  }
}

export const authGetMe = async (req: any, res: any) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      res.status(404).json({
        message: 'Пользователь не зарегистрирован',
      })
    } else {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secret123',
        { expiresIn: '30d' }
      )
      const { passwordHash, ...userInfo } = user._doc

      res.status(200).json({
        ...userInfo,
        token,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: 'Возникла ошибка',
    })
  }
}
