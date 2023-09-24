import { User } from "types/User" 

declare namespace Express {
	export interface Request {
		user?: User
	}
}