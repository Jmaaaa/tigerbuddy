import React, { useEffect, useState } from "react";
import { assignmentData } from "../data";
import { Link } from "react-router-dom";

const CalendarPreview = ({ small=false }) => {
    const [gotThisWeek, setGotThisWeek] = useState(false);
    const [today] = useState(new Date());
    const [thisWeek, setThisWeek] = useState([]);

    useEffect(() => {
        if (gotThisWeek)
            return;
        setGotThisWeek(true);

        // Grab assignments due on the server.
        let weekData = [];

        for (let i = 0; i < 12; i++) {
            let curDay = new Date(today);
            curDay.setDate(today.getDate() + i);
            
            let assignments = [];

            // Crappy linear search.
            for (const [key, data] of Object.entries(assignmentData)) {
                for (const assignment of data) {
                    // console.log(JSON.stringify(assignment));
                    let dateStr = `${assignment.dateDue}T${assignment.timeDue}`;
                    let due = new Date(dateStr);
                    if (due.getMonth() === curDay.getMonth() && due.getDate() === curDay.getDate() && due.getFullYear() === curDay.getFullYear()) {
                        assignments.push({
                            name: assignment.assignment,
                            course: key,
                            due: due,
                            submitted: assignment.submitted
                        });
                    }
                }
            }
            // Fetch assignments for this day.
            
            /*
            if (i === 3) {
                let dueDate = curDay;
                dueDate.setHours(12, 0, 0);
                assignments.push({
                    name: "Assignment 2",
                    due: dueDate,
                    submitted: false
                });

                dueDate.setHours(23, 59, 59);
                assignments.push({
                    name: "Assignment 3",
                    due: dueDate,
                    submitted: false
                });
            }
            */

            weekData.push({
                day: curDay,
                assignments: assignments
            });
        }

        setThisWeek(weekData);
    }, [today, gotThisWeek]);

    return (
        <div className={`container-fluid ${!small && "px-4"} ${small && "pt-4"}`}>
            <div className="row flex-sm-column flex-lg-row">
            {thisWeek && thisWeek.map((data, idx) => {
                return (
                <div className={`${!small && "col-md-3 col-lg-2"} ${small && "col-3"} p-1`} key={idx}>
                    <div className="w-100 h-100 p-2 d-flex flex-column border border-primary rounded" style={{overflow:"hidden"}}>
                        <span className="flex-shrink-0 mb-1 user-select-none">
                            {data.day.getDate()}
                        </span>
                        
                        <div className="flex-grow-1 d-flex flex-column justify-content-end w-100">
                            {data.assignments.map((assign, aindex) => {
                                const dueTime = new Intl.DateTimeFormat('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(assign.due);

                                return (
                                    <Link to={`../courses/${assign.course}/assignments/${assign.name}`} className="text-decoration-none" key={aindex}>
                                        <div className={`${(assign.submitted ? "bg-primary" : "bg-secondary")} rounded px-2 py-1 mb-1 text-light flex-shrink-1 d-flex flex-row`} style={{fontSize:"12px", userSelect:"none"}}>
                                            <span className="text-nowrap flex-shrink-1 flex-grow-1 font-weight-bold" style={{overflow: "hidden"}}>{assign.name}</span>
                                            <span className="pl-2 text-nowrap flex-shrink-0">{dueTime.toString()}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    );
};

export default CalendarPreview;