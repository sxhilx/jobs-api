import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Plus } from "lucide-react";
import { getAllJobs } from "../controllers/jobs";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [jobs, setJobs] = useState([])   
    const [loading, setLoading] = useState(false) 
    
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true)
            try {
                const response = await getAllJobs()
                setJobs(response.jobs)
                setLoading(false)
            } catch (error) {
                console.error("Error Fetching jobs ", error);
                setLoading(false)
                throw error;
            }
        }
        fetchJobs()
    }, [])

    return(
        <div className="max-w-6xl mx-auto font-primary px-2 py-5 bg-base-100">
            <div className="flex flex-col lg:flex-row items-center justify-between mt-10 md:mt-5">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-semibold mt-10">Job Applications</h1>
                    <span className="text-gray-400 mt-2">Track and manage your job applications</span>
                </div>
                <div className="flex justify-between mt-3">
                    <Link to="/add-job" className="bg-black text-white flex justify-center items-center py-3 px-2 rounded-lg text-sm gap-1 font-medium cursor-pointer hover:bg-gray-800">
                        <span><Plus size={18}/></span>
                        New Application
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <div key={item} className="rounded-xl border border-[#E5E7EB] animate-pulse">
                        <div className="p-6">
                          <div className="flex justify-between mb-3">
                            <div className="h-6 bg-base-200 rounded w-32"></div>
                            <div className="h-6 bg-base-200 rounded-full w-20"></div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="h-4 bg-base-200 rounded w-3/4"></div>
                            <div className="h-4 bg-base-200 rounded w-1/2"></div>
                          </div>
                  
                          <div className="flex justify-end mt-5 gap-3">
                            <div className="h-8 bg-base-200 rounded-lg w-20"></div>
                            <div className="h-8 bg-base-300 rounded-lg w-24"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            ) : (
                jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
                       {jobs.map((job) => (                        
                            <JobCard key={job._id} jobs={job} setJobs={setJobs}/>                    
                        ))}
                    </div>
                ): (
                    <div className="flex flex-col justify-center items-center mt-20">
                        <p className="text-gray-500 mt-4 text-lg">No job applications.</p>
                    </div>
                )
            )}
        </div>
    );
}

export default Dashboard;