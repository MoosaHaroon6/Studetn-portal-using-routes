'use client';

import { useParams, useRouter } from 'next/navigation';
import { useStudentContext } from "@/Context/studentContext";
import { useEffect, useState } from 'react';

const StudentDetails = () => {
    const { students } = useStudentContext();
    const { rollNo } = useParams<{ rollNo: string }>();
    const [student, setStudent] = useState<{ name: string; rollNo: number; class?: string; fatherName?: string } | null>(null);

    useEffect(() => {
        if (students.length && rollNo) {
            const rollNoNumber = parseInt(rollNo);
            const foundStudent = students.find(stud => stud.rollNo === rollNoNumber);
            setStudent(foundStudent || null);
        }
    }, [students, rollNo]);

    if (!student) return <div>Student not found</div>;

    return (
        <div>
            <h1>Student Details</h1>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
            <p><strong>Class:</strong> {student.class}</p>
            <p><strong>Father's Name:</strong> {student.fatherName}</p>
        </div>
    );
};

export default StudentDetails;