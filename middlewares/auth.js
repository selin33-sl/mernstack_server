import Errorhandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(async (req, res, next) => {
  // talepten gelen "token" değerini "req.cookies" üzerinden alır.
  const { token } = req.cookies;

  // "token" değerinin varlığını kontrol eder

  if (!token) return next(new Errorhandler("Not Logged In", 401));

  // jwt.verify fonksiyonu, token'ı ve gizli anahtarı kullanarak
  //token'ın geçerliliğini ve bütünlüğünü kontrol eder.
  //Eğer token geçerliyse, bu fonksiyon token içindeki
  //verileri çözerek bir obje olarak döndürür.

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //çözülen JWT içindeki kullanıcı verilerine dayanarak, ilgili
  //kullanıcıyı veritabanından bulur ve "req" (request)
  //nesnesinin "user" özelliğine atar
  req.user = await User.findById(decodedData._id);

  next();
});

export const isAdmin = asyncError(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(new Errorhandler("Only Admin Allowed", 401));

  next();
});
