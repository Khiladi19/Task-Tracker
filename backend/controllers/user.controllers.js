import { User } from '../models/user.model.js';
import { generateToken } from '../utils/genratetoken.js';

export const signup = async (req, res) => {
  const { name, email, password, country } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({  success:false, message: 'User already exists' });

    const user = await User.create({ name, email, password, country });

    res.status(201).json({
      success:true,
      _id: user._id,
      name: user.name,
      email: user.email,
      country: user.country,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({  success:false, message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({  success:false, message: 'Invalid credentials' });
    }

    res.status(201).json({
      success:true,
      _id: user._id,
      name: user.name,
      email: user.email,
      country: user.country,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({  success:false, message: 'Server error', error: error.message });
  }
};

// specific user profile

export const userProfile =async (req,res)=>{
  const user = req.user
  res.status(201).json({
    success:true,
    message:"user profile ",
    user
  })
}