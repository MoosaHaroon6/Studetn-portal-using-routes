'use client';

import { useStudentContext } from "@/Context/studentContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
    name: string;
    rollNo: number;
}

export default function StudentData() {
    const { students, setStudents } = useStudentContext();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        rollNo: 0,
    });

    const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rollNo' ? parseInt(value) : value
        })
    };

    const deleteBtnHandler = (index: number) => {
        let studentsArrClone = [...students];
        studentsArrClone.splice(index, 1);
        setStudents(studentsArrClone);
    };

    const editBtnHandler = (index: number) => {
        setEditIndex(index);
        setFormData(students[index]);
    };

    const updateBtnHandler = () => {
        if (editIndex !== null) {
            const updatedStudentClone = [...students];
            updatedStudentClone[editIndex] = formData;
            setStudents(updatedStudentClone);
            setEditIndex(null);
            setFormData({ name: '', rollNo: 0 });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th style={{
                        border: '2px solid gray', textAlign: 'center',
                        width: '45px', fontSize: '13px', height: '30px',
                        backgroundColor: '#000', color: '#fff'
                    }}>Sr.No</th>
                    <th style={{
                        border: '2px solid gray', textAlign: 'center',
                        width: '300px', fontSize: '13px',
                        backgroundColor: '#000', color: '#fff'
                    }}>Student Name</th>
                    <th style={{
                        border: '2px solid gray', textAlign: 'center',
                        width: '100px', fontSize: '13px',
                        backgroundColor: '#000', color: '#fff'
                    }}>Roll No</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <>
                        <tr key={index + student.rollNo}>
                            <td style={{
                                border: '2px solid #000', width: '45px', textAlign: 'center',
                                backgroundColor: 'lightgray'
                            }}>
                                {index + 1}
                            </td>
                            <td style={{
                                border: '2px solid #000', width: '300px', textAlign: 'center',
                                backgroundColor: 'lightgray'
                            }}>
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={onChangeStatus}
                                        placeholder="Edit Student Name"
                                        style={{
                                            width: '250px', height: '30px', border: 'none',
                                            borderRadius: '2px', fontSize: '15px'
                                        }}
                                    />
                                ) : (
                                    student.name
                                )}
                            </td>
                            <td style={{
                                border: '2px solid #000', width: '140px', textAlign: 'center',
                                backgroundColor: 'lightgray'
                            }}>
                                {editIndex === index ? (
                                    <input
                                        type="number"
                                        name="rollNo"
                                        value={formData.rollNo}
                                        onChange={onChangeStatus}
                                        placeholder="Edit Roll No"
                                        style={{
                                            width: '120px', height: '30px', border: 'none',
                                            borderRadius: '2px', fontSize: '15px'
                                        }}
                                    />
                                ) : (
                                    <Link href={`/rollNo/${student.rollNo}`}>
                                        {student.rollNo}
                                    </Link>
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <button
                                        onClick={updateBtnHandler}
                                        style={{
                                            height: '40px', width: '140px', border: 'none',
                                            backgroundColor: '#4CAF50', fontSize: '1rem', color: '#fff',
                                            borderRadius: '4px', cursor: 'pointer'
                                        }}>
                                        Save Changes
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => editBtnHandler(index)}
                                            style={{
                                                height: '40px', width: '80px', border: 'none',
                                                backgroundColor: '#92cf92', fontSize: '1rem', color: '#fff',
                                                borderRadius: '4px', cursor: 'pointer'
                                            }}>Edit</button>
                                        <button
                                            onClick={() => deleteBtnHandler(index)}
                                            style={{
                                                height: '40px', width: '80px', border: 'none',
                                                backgroundColor: '#e57373', fontSize: '1rem', color: '#fff',
                                                borderRadius: '4px', cursor: 'pointer'
                                            }}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    </>))}
            </tbody>
        </table>
    );
}
