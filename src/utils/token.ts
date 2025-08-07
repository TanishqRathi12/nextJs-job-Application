import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export const generateToken = ({id, role, email}: {id: string, role: string, email: string}) => {
  const token = jwt.sign({ id, role, email }, secret, {
    expiresIn: "3d",
  });
  return token;
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch {
    return null;
  }
};