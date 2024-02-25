import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';


export default function ProfilePage() {
    return (
        <div className="w-full px-[300px]">
            <div className='mx-auto'>
                <Link to="../" className='flex items-center px-3 py-4 hover:underline'>
                    <ArrowBackIosNewIcon />
                    BACK TO HOME PAGE
                </Link>
                <div className='bg-gray-200 rounded-lg'>
                    <div className='flex items-center px-3 py-2'>
                        <PersonIcon />
                        PROFILE
                    </div>
                    <div className='z-[1000] w-full h-[1px] bg-black/20' />
                    <div className='py-3 px-10'>
                        <div >
                            <div className='rounded-full w-[130px] h-[130px] bg-red-50 mx-auto'>
                                <img src="" alt="" className='object-fit' />
                            </div>
                            <p className='mt-2 text-center'>Current Name</p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <div>
                                <input type="checkbox" id='male' />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="checkbox" id='female' />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='flex flex-col mb-3'>
                                <label htmlFor="fullname">Full Name</label>
                                <input type="text" id='fullname' className='rounded-[4px] py-2 px-3 border-none outline-none' />
                            </div>
                            <div className='flex flex-col mb-3'>
                                <label htmlFor="number">Phone Number</label>
                                <input type="text" id='number' className='rounded-[4px] py-2 px-3 border-none outline-none' />
                            </div>
                            <div className='flex flex-col mb-3'>
                                <label htmlFor="email">Email (optional)</label>
                                <input type="email" id='email' className='rounded-[4px] py-2 px-3 border-none outline-none' />
                            </div>
                        </div>
                        <button className='mt-4 uppercase font-bold text-2xl text-center py-3 bg-primary hover:bg-primary-dark w-full rounded-[4px] text-white'>
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
