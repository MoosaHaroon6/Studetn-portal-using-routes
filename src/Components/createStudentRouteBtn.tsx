"use client";
import { useRouter } from "next/navigation";

const CreateStudentRouteBtn = () => {
    const router = useRouter()
    const btnHandler = () => {
        router.push('/createStudent');
    }

    return (
        <button onClick={btnHandler}
            style={{
                width: '150px', height: '40px', backgroundColor: '#3333',
                color: '#212121', borderRadius: '5px', cursor: 'pointer'
            }}>
            Create Students</button>
    )
}

export default CreateStudentRouteBtn;