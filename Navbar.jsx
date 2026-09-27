
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(
                `${USER_API_END_POINT}/logout`,
                { withCredentials: true }
            )

            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Logout failed")
        }
    }

    const firstLetter = user?.fullname
        ? user.fullname.charAt(0).toUpperCase()
        : "U"

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">

                <div>
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#6A38C2]">Sphere</span>
                    </h1>
                </div>

                <div className="flex items-center gap-7">

                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === "recruiter" ? (
                            <>
                                <li>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>

                                <li>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>

                                <li>
                                    <Link to="/jobs">Jobs</Link>
                                </li>

                                <li>
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="cursor-pointer">
                                    {user?.profile?.profilePhoto ? (
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src={user.profile.profilePhoto}
                                                alt={user.fullname}
                                            />
                                        </Avatar>
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-[#6A38C2] text-white flex items-center justify-center font-bold">
                                            {firstLetter}
                                        </div>
                                    )}
                                </div>
                            </PopoverTrigger>

                            <PopoverContent className="w-80">

                                <div className="flex gap-3 items-center">

                                    {user?.profile?.profilePhoto ? (
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={user.profile.profilePhoto}
                                                alt={user.fullname}
                                            />
                                        </Avatar>
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-[#6A38C2] text-white flex items-center justify-center font-bold">
                                            {firstLetter}
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-medium">
                                            {user.fullname}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-col my-4">

                                    {user.role === "student" && (
                                        <div className="flex items-center gap-2">
                                            <User2 size={18} />

                                            <Link to="/profile">
                                                <Button variant="link">
                                                    View Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} />

                                        <Button
                                            onClick={logoutHandler}
                                            variant="link"
                                        >
                                            Logout
                                        </Button>
                                    </div>

                                </div>

                            </PopoverContent>
                        </Popover>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Navbar

