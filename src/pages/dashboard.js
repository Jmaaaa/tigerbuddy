import React from "react";
import { CourseCard, AnnouncementCard, CalendarPreview, FeedbackCard} from "../components/dashboardComponents";
import { courseCodes } from "../components/data";

const Dashboard = () => {

    return (
        <div className="d-flex flex-column h-100">
            <div className=" d-flex align-items-center bg-light" 
            style={{height: "20%"}}>
                <h1 className="mx-5">
                    Welcome to the dashboard
                </h1>
            </div>
            <div className="d-flex flex-row p-3 " style={{height: "80%"}}>
                <div className="d-flex flex-column w-25">
                    {courseCodes.map((code,index) => (
                        <CourseCard key={index} code={code}/>
                    ))}
                </div>
                <div className="d-flex flex-column p-3 w-100">
                    <div className="d-flex flex-row h-50">
                        <div className="w-50">
                            <h1 className="m-2">
                            Recent Announcements
                            </h1>
                            <div className="p-2">
                                <AnnouncementCard/>
                            </div>
                        </div>
                        <div>
                            <h1 className="m-2">
                            Recent Feedback
                            </h1>
                            <div className="p-2">
                                <FeedbackCard/>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="m-2">
                        Upcoming Schedule
                        </h1>
                        <div>
                            <CalendarPreview/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;