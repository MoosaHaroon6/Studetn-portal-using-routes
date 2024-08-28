"use client";

import Link from "next/link";
import { useState } from "react"
import { useStudentContext } from "@/Context/studentContext";;

type FormData = {
    name: string;
    rollNo: number | string;
    studentClass: string;
    fatherName: string;
}

export default function CreateStudent() {

    const [isSaved, setIsSaved] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showLink, setShowLink] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const { addStudents } = useStudentContext()

    const [form, setForm] =
        useState<FormData>({
            name: '',
            rollNo: '',
            studentClass: '',
            fatherName: '',
        });

    const { name, rollNo, studentClass, fatherName } = form;


    const onChangeStatus = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        }
        )
        setError('');
    }

    const btnHandler = () => {
        setShowForm(!showForm);
        setForm({ name, rollNo, studentClass, fatherName })
        setError('');
    }

    const saveBtnHandler = () => {
        if (name === '' || isNaN(Number(rollNo)) || rollNo === "") {
            setError('Fill Your Requirements or Enter correct data .');
        } else {
            addStudents({
                name,
                rollNo: Number(rollNo),
                studentClass,
                fatherName,
            })
            setShowForm(false);
            setIsSaved(true);
            setShowLink(true);
            setError('');
            setTimeout(() => {
                setIsSaved(false);
            }, 3000);
            setForm({
                name: "",
                rollNo: "",
                studentClass: "",
                fatherName: ""
            })
        }
    }

    return (
        <>
            <p style={{ fontFamily: 'fantasy', fontSize: '25px' }}>Create Your Student Here...</p>
            <button onClick={btnHandler}
                style={{
                    backgroundColor: '#4ea6e0', width: '200px', height: '45px'
                    , color: '#fff', fontSize: '1.2rem', fontFamily: 'monospace', border: 'none',
                    borderRadius: '5px', cursor: 'pointer'
                }}>
                Add Student</button>
            {showForm && (
                <>
                    <form
                        style={{
                            display: 'flex', marginTop: '40px', border: '3px solid #212122',
                            flexDirection: 'column', width: '200px', padding: '20px', justifyContent: 'space-between',
                            alignItems: 'center', backgroundColor: 'lightgray', borderRadius: '10px'
                        }}>
                        <h3>Fill The Requirements</h3>
                        <label>Name :
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChangeStatus}
                                placeholder="Student Name"
                                style={{
                                    width: '200px', height: '30px', textAlign: "start",
                                    border: 'none', borderRadius: "5px", fontSize: '15px',
                                    marginTop: '5px'
                                }}
                            />
                        </label>
                        <br />
                        <label>Roll No:
                            <input
                                type="text"
                                name="rollNo"
                                value={rollNo}
                                onChange={onChangeStatus}
                                placeholder="Student roll no"
                                style={{
                                    width: '200px', height: '30px', textAlign: "start",
                                    border: 'none', borderRadius: "5px", fontSize: '15px',
                                    marginTop: '5px'
                                }}
                            />
                        </label><br />
                        <label>Class :
                            <input
                                type="text"
                                name="studentClass"
                                value={studentClass}
                                onChange={onChangeStatus}
                                placeholder="Student class"
                                style={{
                                    width: '200px', height: '30px', textAlign: "start",
                                    border: 'none', borderRadius: "5px", fontSize: '15px',
                                    marginTop: '5px'
                                }}
                            />
                        </label><br />
                        <label>Father's Name :
                            <input
                                type="text"
                                name="fatherName"
                                value={fatherName}
                                onChange={onChangeStatus}
                                placeholder="father's Name"
                                style={{
                                    width: '200px', height: '30px', textAlign: "start",
                                    border: 'none', borderRadius: "5px", fontSize: '15px',
                                    marginTop: '5px'
                                }}
                            />
                        </label>
                    </form>
                    <button
                        onClick={saveBtnHandler}
                        style={{
                            width: '240px', height: '30px', marginTop: '20px',
                            marginLeft: '2px', borderRadius: "5px", backgroundColor: "orange",
                            fontSize: '1.1rem', border: 'none', color: '#fff', cursor: 'pointer'
                        }}
                    >Save</button>
                </>
            )}

            {isSaved && <p style={{ color: "green" }}>Your Data has been saved.</p>}

            <br /><br />

            {showLink && (
                <Link href={"/studentData"}><abbr title="click here to see further details and edit">See Details</abbr></Link>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    )
}